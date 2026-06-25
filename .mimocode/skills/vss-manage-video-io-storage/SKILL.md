---
name: vss-manage-video-io-storage
description: "Use when working with vss-manage-video-io-storage"
---

---
name: vss-manage-video-io-storage
description: Use to call the VIOS REST API (sensor list, timelines, clip extraction, snapshots, add/delete sensors and streams). Not for VLM inference or search.
license: Apache-2.0
metadata:
  version: "3.2.0"
  github-url: "https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization"
  tags: "nvidia blueprint operational"
---
## Purpose

Manage VIOS and NvStreamer API operations for VSS video input/output and
storage workflows: sensors, streams, uploads, snapshots, clips, timelines, and
recording status.

## Prerequisites

- Active VSS deployment reachable on `$HOST_IP` (see `vss-deploy-profile` and `references/`).
- NGC credentials in `$NGC_CLI_API_KEY` and `$NVIDIA_API_KEY` for any image pulls.
- `curl`, `jq`, and Docker available on the caller.

## Instructions

# VIOS Operations

Call the VIOS REST API to manage cameras/sensors, RTSP streams, recordings, snapshots, and storage. Use when asked to: add a camera, add an RTSP stream, list sensors, show configured sensors/cameras/streams, check stream status, get a snapshot, download a clip, upload a video file, or manage video storage. Query the VIOS API directly using curl â€” do not navigate the UI.

**Upload routing rule:**
- If the user asks to "upload `<file>.mp4` to VIOS", "upload a video file", or otherwise means storing a local video as a VIOS file-backed sensor, use the direct VIOS API: `PUT /vst/api/v1/storage/file/{filename}` from [`references/api-reference.md`](references/api-reference.md) Section 8.
- Use NvStreamer only when the user explicitly needs a live/synthetic RTSP camera feed, asks for NvStreamer, or asks to retrieve an RTSP URL.
- Do not substitute the NvStreamer upload -> RTSP URL -> VIOS `/sensor/add` handoff for a plain VIOS MP4 upload request.

**Do NOT use this skill for:**
- VLM inference or ad-hoc visual Q&A about a clip â€” use `vss-ask-video`.
- Semantic search across the archive, or ingesting video for search â€” use `vss-search-archive`.
- Narrative summaries of a recorded clip â€” use `vss-summarize-video`.
- Incident-range or alert-window reports â€” use `vss-generate-video-report` Mode B.
- Reading analytics metrics, incidents, or alerts â€” use `vss-query-analytics`.

## Reference contracts shipped with this skill

This skill bundles four reference files under `references/`. Read whichever applies to the task in front of you:

| File | Purpose | Audience |
|---|---|---|
| [`references/api-reference.md`](references/api-reference.md) | The full VIOS REST API reference (the runtime contract) â€” sensor management, storage, snapshots, clip extraction, WebRTC live/replay, RTSP proxy, recorder, service configuration, service discovery. **Read this when invoking any VIOS API operation.** | Operational users + this skill itself |
| [`references/nvstreamer-api-reference.md`](references/nvstreamer-api-reference.md) | The **NvStreamer REST API reference** â€” version, sensor list/info/status/streams, the three upload methods (PUT v2 / PUT v1 / POST multipart) with the `nvstreamer-*` custom headers, delete, snapshots (frame-indexed live, timestamp-indexed storage), storage info, filesystem scan. NvStreamer (`vss-vios-nvstreamer`, the streamer-adaptor variant of `launch_vst`) is **brought up by the same profiles that bring VIOS up** â€” `dev-profile-alerts`, `dev-profile-lvs`, `dev-profile-search`, all warehouse profiles. See `integrate-vios-service.md Â§ Topology B` for the deployment side. **Read this when serving test / sample videos as synthetic RTSP, retrieving the RTSP URL NvStreamer generated for a file, or driving the canonical NvStreamer â†’ VIOS handoff** (upload to NvStreamer â†’ read RTSP URL â†’ register that URL with VIOS via `/sensor/add`). | Operational users + skill authors composing the upload â†’ RTSP URL â†’ VIOS `/sensor/add` flow |
| [`references/integrate-vios-service.md`](references/integrate-vios-service.md) | The **integration contract** â€” how VIOS plugs into other VSS microservices. Documents required peer services (RT-VLM, ELK, Kafka, Redis, `sdr-controller` / SDRC), the structured `component_services:` block consumed by the `vss-build-vision-agent` skill's Step 4, integration inputs/outputs (Kafka topics, REST endpoints, file paths), environment variables, network requirements, and known integration constraints (e.g. the `/url`-variant double-`http://` bug, the VIOS + SDRC patching requirement). **Read this when authoring a skill that talks to VIOS as a peer, when composing a new VSS deployment, or when debugging caption-pipeline wiring.** | Skill authors, deployment composers, pair-file maintainers |
| [`references/deploy-vios-service.md`](references/deploy-vios-service.md) | The **deployment contract** â€” what it takes to bring VIOS up. Documents container images and tags (`nvcr.io/nvidia/vss-core/vss-vios-*:3.2.0`), GPU / CPU / memory / storage requirements, startup behavior + healthcheck tuning, required environment variables (notably `VST_INSTALL_ADDITIONAL_PACKAGES=true` for the libav apt-install step that gates uploads), known deployment issues (volume drift, libav missing, 502 from leftover containers), prerequisites, dry-run, verify-deployment, and tear-down commands. **Read this when VIOS isn't running and you (or your caller) need to deploy it standalone, when debugging container-startup failures, or when authoring a deploy skill that wraps VIOS.** | Operators, deploy-skill authors |

## Deployment prerequisite â€” VIOS MUST be running

This skill is primarily an API client and assumes VIOS is already up and reachable at the VST ingress (default `http://${HOST_IP}:30888`). It does not deploy VIOS itself, but when VIOS is unreachable it coordinates a deploy using its bundled deployment runbook ([`references/deploy-vios-service.md`](references/deploy-vios-service.md)) or hands off to the full-stack `/vss-deploy-profile` skill. Before doing any work:

1. **Probe VIOS:**
   ```bash
   curl -sf --max-time 5 "http://${HOST_IP}:30888/vst/api/v1/sensor/version" >/dev/null
   ```

2. **If the probe fails, VIOS is not deployed.** Offer two paths forward:

   > *"VIOS is not reachable at `http://${HOST_IP}:30888` â€” no deployment is currently up. You have two options:*
   > *(a) Bring up VIOS standalone using this skill's bundled [`references/deploy-vios-service.md`](references/deploy-vios-service.md) runbook â€” image tags, env vars (notably `VST_INSTALL_ADDITIONAL_PACKAGES=true`), host directories, NGC login, bring-up command, healthcheck loop, and known deployment issues are all documented there. This is the right path if you only need VIOS itself (no RT-VLM / ELK / etc.) or if you're composing a custom profile.*
   > *(b) Deploy a full VSS profile that includes VIOS via the `/vss-deploy-profile` skill â€” `base` (recommended), `lvs`, `search`, or `alerts` all bring VIOS up alongside other components. This is the right path if you want a complete VSS stack.*
   > *Which would you like?"*

   - If the user picks (a) â†’ walk them through `references/deploy-vios-service.md` step by step. Pay particular attention to its `Â§ Environment Variables â€” Required for Upload-to-Caption Path` and `Â§ Known Deployment Issues` sections â€” the libav-missing failure (`VST_INSTALL_ADDITIONAL_PACKAGES=true`) and the volume-drift hang (`docker compose up --yes` or `docker volume rm` first) are the two most common bring-up blockers. After deploy succeeds and the probe in step 1 passes, return here.
   - If the user picks (b) â†’ hand off to `/vss-deploy-profile -p <profile>` (default `base`). Return here once it succeeds.
   - If the user declines both â†’ **stop**. VIOS operations require the VST backend to be up; do not attempt to fabricate responses or proceed with a degraded mode.

   *Pre-authorized autonomous mode:* if your caller has granted explicit pre-authorization to deploy prerequisites (e.g. the request says "pre-authorized to deploy prerequisites", or you are running in a non-interactive evaluation harness with that permission), skip the confirmation and prefer path (a) â€” bring up VIOS standalone via this skill's bundled `references/deploy-vios-service.md` â€” unless the request explicitly asks for a full VSS profile, in which case invoke `/vss-deploy-profile -p base`.

3. **If the probe passes, proceed.** VIOS is up; all operations below are safe to execute.

---

## Known limitation â€” leftover containers from prior deploys

`GET /vst/api/v1/sensor/list` and `GET /vst/api/v1/sensor/<sensorId>/streams`
can return **HTTP 502 Bad Gateway** or stale results when leftover `*-smc`
VST containers from an earlier deploy survive teardown and win the
`network_mode: host` port-bind race on `:30000` / `:30888`. **Remediation:
re-run `/vss-deploy-profile`** â€” its Step 0 teardown grep clears the full
`sensor-ms-*` / `vst-ingress-*` / `sdr-*` / `sdrc-*` / `rtspserver-ms-*` set.
Other paths (`storage/file/*` upload, `*/picture/url` snapshot, `*/url` clip
extraction) are unaffected. Full failure-mode catalogue, remediation, and the
current routing contract (direct vs SDRC; SDR/Envoy removed in PR #711) live in
`references/deploy-vios-service.md Â§ Known Deployment Issues` and
[issue #151](https://github.com/NVIDIA-AI-Blueprints/video-search-and-summarization/issues/151).

---

## Setup

**Base URL:** `http://<VST_ENDPOINT>/vst/api/v1`

**Endpoint Resolution:**
- Use the VIOS endpoint associated with the active VSS deployment. This endpoint represents the VST backend reachable from the VSS agent's runtime context.
- Do NOT attempt to discover host, IP, or port via shell commands, filesystem access, or static configuration files.
- Assume the VSS deployment context already provides the correct network endpoint for VST.

**Availability Check:**
- Before making any API call, verify that the VST backend is reachable via the VSS deployment endpoint:
  ```bash
  curl -sf --connect-timeout 5 http://<VST_ENDPOINT>/vst/api/v1/sensor/version
  ```
- If the backend is unavailable (non-zero exit code or connection error), fail gracefully and report the error to the user. See the **Deployment prerequisite** section above for the deploy-or-stop branch.

**Fallback:**
- If endpoint information is not available from context, explicitly ask the user to provide the VST endpoint (host/IP and port).

**Run all curl commands yourself** â€” never instruct the user to run commands manually.

**Auth:** Optional. Most deployments run without auth. If a `401` is returned, retry with `-H "Authorization: Bearer <token>"` and ask the user for the token.

**Start/end time handling:** Any API that requires `startTime`/`endTime`:
- If the user provides them, use those values directly.
- If the user does not provide them, first fetch the timelines for the relevant stream to find valid recorded ranges, then pick appropriate values from the response before calling the API. Never fabricate timestamps.

**Resolving sensorId / streamId:** If the user has not provided a sensorId or streamId, look it up automatically using one of:
- `GET /sensor/list` â€” lists all sensors with their `sensorId`
- `GET /sensor/{sensorId}/streams` â€” lists streams for a specific sensor with their `streamId`
- `GET /sensor/streams` â€” lists all streams across all sensors
- `GET /live/streams` â€” lists all active live streams
- `GET /replay/streams` â€” lists all available replay streams

If a sensor has only one stream, `sensorId` and `streamId` are equal and can be used interchangeably.

---

## Service Map

| Capability | URL prefix | Authoritative reference |
|---|---|---|
| Version / health check | `/vst/api/v1/sensor/version` | `references/api-reference.md` |
| Sensor list / info / status / add / delete | `/vst/api/v1/sensor/` | `references/api-reference.md` |
| Sensor streams | `/vst/api/v1/sensor/streams`, `/vst/api/v1/sensor/{id}/streams` | `references/api-reference.md` |
| Network scan | `/vst/api/v1/sensor/scan` | `references/api-reference.md` |
| Recording timelines | `/vst/api/v1/storage/` | `references/api-reference.md` |
| Video clip download / URL | `/vst/api/v1/storage/` | `references/api-reference.md` (operations) + `references/integrate-vios-service.md Â§ Known Integration Constraints` (Finding 8: `/url` double-`http://` bug â€” prefer binary direct endpoints) |
| File upload / delete | `/vst/api/v1/storage/` | `references/api-reference.md` (PUT v2 + legacy v1 endpoints) + `references/deploy-vios-service.md Â§ Known Deployment Issues` (Finding 9: libav-missing failure mode) |
| Live streams / snapshot (picture) | `/vst/api/v1/live/` | `references/api-reference.md` |
| Replay streams / historical snapshot | `/vst/api/v1/replay/` | `references/api-reference.md` (operations) + `references/integrate-vios-service.md Â§ Known Integration Constraints` (Finding 8) |
| **NvStreamer**: file-to-RTSP republisher (upload, retrieve generated RTSP URL, filesystem scan, frame snapshots) | `http://${HOST_IP}:${NVSTREAMER_HTTP_PORT:-31000}/vst/api/v1/` | `references/nvstreamer-api-reference.md` (the streamer endpoint is **separate** from the VIOS gateway â€” different port, `type: "streamer"` on `/version`) |

---

## Operations

The full VIOS REST API reference â€” sensor management, storage, snapshots, clip extraction, WebRTC live/replay, RTSP proxy, recorder, service configuration, and service discovery â€” lives in [`references/api-reference.md`](references/api-reference.md). Read that file when invoking any operation.

When a request involves serving an on-disk video file as a synthetic RTSP camera (upload a sample to NvStreamer, retrieve the auto-generated RTSP URL, register that URL with VIOS), point at the NvStreamer endpoint and follow [`references/nvstreamer-api-reference.md`](references/nvstreamer-api-reference.md) for the surface. NvStreamer comes up automatically with any VIOS-using profile that ships it; do not deploy it separately.

For integration- and deployment-time questions about how VIOS interacts with other microservices or how it's brought up, defer to [`references/integrate-vios-service.md`](references/integrate-vios-service.md) and [`references/deploy-vios-service.md`](references/deploy-vios-service.md) respectively (see the **Reference contracts** table above for what each covers).

---

## Workflow: sensor name/IP -> clip or snapshot

When the user has a sensor name or IP but needs a clip or snapshot:

0. Verify VST is reachable (see Setup â€” Availability Check):
   ```bash
   curl -sf --connect-timeout 5 "http://<VST_ENDPOINT>/vst/api/v1/sensor/version"
   ```
1. List sensors to find `sensorId`:
   ```bash
   curl -s "http://<VST_ENDPOINT>/vst/api/v1/sensor/list" | jq .
   ```
2. Get streams for that sensor to find `streamId` (prefer `isMain: true`):
   ```bash
   curl -s "http://<VST_ENDPOINT>/vst/api/v1/sensor/<sensorId>/streams" | jq .
   ```
3. Check timelines to confirm a recording exists in the requested range:
   ```bash
   curl -s "http://<VST_ENDPOINT>/vst/api/v1/storage/<streamId>/timelines" | jq .
   ```
4. Download clip or snapshot using the `streamId`. Prefer the **binary direct endpoints** (`/storage/file/<streamId>?startTime=...&endTime=...`, `/replay/stream/<streamId>/picture?startTime=...`, `/storage/stream/<streamId>/picture?startTime=...`) over the `/url` JSON envelope variants â€” see `references/integrate-vios-service.md Â§ Known Integration Constraints` Finding 8 (the `/url` variants return double-`http://` URLs in 3.2.0 and require client-side stripping).

---

## Responses

**Success with data:** JSON object or array.

**Success with no data:** `null` â€” a `null` response means the API call succeeded but there is no data to return (e.g. no schedule configured, scan returned no results). It is not an error.

**Success with boolean:** Some endpoints return `true` on success (e.g. `DELETE /sensor/{sensorId}`).

**Error:** JSON object with `error_code` and `error_message`:
```json
{
  "error_code": "VMSInternalError",
  "error_message": "VMS internal processing error"
}
```

Common codes: `VMSInternalError`, `VMSNotFound`, `VMSInvalidParameter`.

If you see `InvalidParameterError: Failed to get media information` on a PUT upload, this is the libav-missing failure mode â€” VIOS was deployed without `VST_INSTALL_ADDITIONAL_PACKAGES=true`. See `references/deploy-vios-service.md Â§ Known Deployment Issues` Finding 9 for the fix.

If you see double-`http://` prefixes in `imageUrl` or `videoUrl` fields on `/url`-variant responses, that's Finding 8 â€” strip the leading `http://` client-side or switch to binary direct endpoints.

---

## Examples

Example operation prompts:
- "List the active VIOS sensors and show their stream status."
- "Upload this sample video to VIOS and return the generated stream id."
- "Download a two-second clip from this sensor's recording timeline."
- "Use NvStreamer to upload a file and retrieve its generated RTSP URL."

## Limitations

- VIOS operations require a reachable VST backend; stop or deploy prerequisites
  when the health probe fails.
- Most deployments do not require auth, but a deployment can add an external
  auth layer.
- Container-side paths in examples use `${VST_CONTAINER_ROOT}` as a neutral
  placeholder for the VST install root inside the container. Resolve it from the
  active deployment before using path examples.
- Do not print API keys, bearer tokens, or generated credentials in logs or
  final responses.

## Troubleshooting

- **Error**: health probe fails. **Cause**: VIOS is not deployed or the endpoint
  is wrong. **Solution**: follow the deployment prerequisite flow or ask for the
  correct VST endpoint.
- **Error**: uploads fail with `Failed to get media information`. **Cause**:
  libav packages were not installed in the VIOS container. **Solution**: set
  `VST_INSTALL_ADDITIONAL_PACKAGES=true` and redeploy.
- **Error**: `/url` responses contain `http://http://...`. **Cause**: known URL
  construction defect. **Solution**: use binary direct endpoints or strip the
  duplicated prefix.

---

## Tips

- **jq:** All JSON responses are piped through `jq .` for readability. Binary responses (clip download, snapshot) are not â€” they use `-o <file>` instead.
- **Time format:** Always ISO 8601 UTC, e.g. `2026-04-10T10:30:00Z` or `2026-04-10T10:30:00.000Z`.
- **streamId header:** Live/replay/recorder endpoints require `streamId` as BOTH a path parameter AND a request header â€” include both.
- **Large clips:** Use the binary direct `/storage/file/<id>?...&container=mp4` endpoint with `-o clip.mp4` for direct streaming. The `/url` envelope variant has the Finding 8 double-`http://` defect â€” avoid until upstream fixes it or use client-side prefix stripping.
- **Sensor vs stream ID:** `sensorId` identifies a camera; `streamId` identifies a specific video stream from that camera (a sensor can have a main stream and sub-streams).
- **Identifying sensor type (RTSP vs uploaded file):** Call `GET /sensor/<sensorId>/streams` and inspect the `url` field of each stream. If `url` starts with `rtsp://` it is a live RTSP/IP camera stream. If `url` is a file path (e.g. `"${VST_CONTAINER_ROOT}/streamer_videos/TruckAccident.mp4"`) it is an uploaded file sensor. This determines which delete flow to use â€” see Section 8.
- **Upload timestamp is honored for the recorded timeline:** When uploading a file via `PUT /vst/api/v1/storage/file/<filename>?timestamp=<iso>`, the timeline returned by `GET /storage/<streamId>/timelines` is anchored at the supplied timestamp, not the upload wall-clock time. Subsequent snapshot / clip queries MUST use timestamps within this range â€” fetch the timeline first. See `references/api-reference.md Â§ 8` and `references/integrate-vios-service.md Â§ Integration Interfaces > Inputs > Upload video file` for the authoritative contract.
- **Endpoint resolution:** The VST endpoint is provided by the VSS deployment context. Do not attempt manual IP/port discovery. If unavailable, ask the user. All curl examples use `<VST_ENDPOINT>` as a placeholder â€” substitute the resolved endpoint before executing.

