---
name: tilegym-converting-cutile-to-triton
description: "Use when working with tilegym-converting-cutile-to-triton"
---

---
name: tilegym-converting-cutile-to-triton
version: "1.0.0"
description: Converts cuTile GPU kernels (@ct.kernel) to Triton (@triton.jit). Handles standard in-repo conversion, debugging (cudaErrorIllegalAddress, shape mismatch, numerical mismatch), and mapping cuTile idioms (ct.load/ct.store, ct.Constant, ct.launch) to Triton equivalents. Covers dual-kernel layout flags (e.g. transpose=True/False + autotune grid via META) per translations/advanced-patterns.md. Use when converting, porting, or translating cuTile kernels to Triton, or debugging existing Triton translations.
license: CC-BY-4.0 AND Apache-2.0
tools:
  - Read
  - Write
  - Grep
  - Glob
  - Bash
metadata:
  author: "TileGym Team <TileGym@nvidia.com>"
  tags:
    - cutile
    - triton
    - conversion
    - gpu
    - kernel
---

# cuTile â†’ Triton Conversion

Convert `@ct.kernel` kernels to `@triton.jit`. API mapping: [references/api-mapping.md](./references/api-mapping.md) (cuTile â†’ Triton).

*In this skillâ€™s Markdown, Triton launch syntax `kernelï¼»gridï¼½(â€¦)` uses Unicode brackets so link checkers do not parse `[grid](â€¦)` as a hyperlink; use normal ASCII brackets in real Triton code.*

## Instructions

Follow the phase-gated workflow in [translations/workflow.md](./translations/workflow.md). Every conversion should go through **analyze â†’ convert â†’ validate â†’ test â†’ benchmark**, with explicit gates before moving on. Use the documents in [Workflow Selection](#workflow-selection) when the task matches a special case (errors, layout flags, perf).

0. **Optimization strategy (perf-sensitive / attention)** â€” If the op is **attention, FMHA, sliding window, soft cap, or GQA** (e.g. Gemma `gemma_attention`), read **[references/optimization-strategy.md](./references/optimization-strategy.md)** **before** converting the inner loop, then apply **[Â§4 Gemma FMHA checklist](./references/optimization-strategy.md#4-gemma-fmha--gemma_attention-conversion-checklist-mandatory)**. For other GEMM/BMM/attention-adjacent kernels, still skim **Â§2â€“Â§3** of that file after TMA is done.

1. **Select path** â€” Existing TileGym op: standard mode in `translations/workflow.md`. If the cuTile source uses `transpose` / `transpose_v`, dual layouts, or MLA-style paths, read [translations/advanced-patterns.md](./translations/advanced-patterns.md) **before** writing Triton (two kernels + `META` grid, not one kernel + `tl.trans`).

2. **Pre-flight** â€” Run the [Pre-flight Analysis](#pre-flight-analysis-run-before-converting) grep commands on the cuTile source. Count `@ct.kernel` definitions; note TMA-relevant `ct.load`/`ct.store`, `ct.launch`, `Constant`, and layout flags.

3. **Read mapping** â€” Keep [references/api-mapping.md](./references/api-mapping.md) open for cuTile â†’ Triton API pairs. For runtime failures (illegal address, dtype, strides), use [references/debugging.md](./references/debugging.md).

4. **Convert** â€” Copy the [Conversion Checklist](#conversion-checklist) into a todo list and execute in order. Structure and file placement: [translations/file-structure.md](translations/file-structure.md). **Mandatory:** any **2D+ block-shaped** tile load/store uses `tl.make_tensor_descriptor` (TMA), not raw `tl.load(ptr+offs, mask=â€¦)` for full tilesâ€”skipping this is the most common source of large regressions. Host side: Triton bracket launch <code>kernelï¼»gridï¼½(args)</code> with tuple or `lambda META: (â€¦)` for autotune; no `ct.launch`.

5. **Validate** â€” Syntax-check the new Triton module; run the relevant TileGym pytest targets for the op: `pytest tests/ops/test_<op>.py -k "triton" -vs`. Fix failures before benchmarking.

6. **Benchmark** â€” Compare Triton vs cuTile on perf tests. If Triton is clearly slower, follow **PERFORMANCE ANALYSIS (Phase c2t-5)** in [translations/workflow.md](./translations/workflow.md) and [references/optimizing-reference.md](./references/optimizing-reference.md) for GEMM/BMM/attention; use [references/optimization-strategy.md](./references/optimization-strategy.md) as the ordered checklist. If you see **10â€“50Ã—** slowdowns, read **CRITICAL PERFORMANCE PATTERNS** in that same workflow file first.

**Execution rules (MUST):**

- Create and track the conversion checklist (e.g. TodoWrite) **before** editing kernel code; complete steps in orderâ€”do not skip pre-flight or TMA decisions.
- For **attention / FMHA / Gemma / GQA / soft cap / sliding window**: read [references/optimization-strategy.md](./references/optimization-strategy.md) and apply **Â§4** **before** treating the conversion as optimized.
- Do **not** ship raw pointer+mask 2D+ tile loads where TMA applies; document any intentional exception.
- If tests or benchmarks fail a gate, stop and fix **before** declaring the conversion doneâ€”do not stack unverified changes.

## Workflow Selection

- **Existing TileGym op** â†’ Standard Mode: [translations/workflow.md](./translations/workflow.md)
- **Errors** (`cudaErrorIllegalAddress`, shape mismatch, numerical mismatch) â†’ [references/debugging.md](./references/debugging.md)
- **Advanced patterns** (TMA, dual layout flags `transpose`, autotune + `META` grid, Array.slice, ct.gather().item()) â†’ **[translations/advanced-patterns.md](./translations/advanced-patterns.md)** (MLA-style two kernels, avoid 3â€“15Ã— regression on `transpose=False`).
- **Performance** (Triton kernel slower than cuTile, autotuning, profiling) â†’ [translations/workflow.md](./translations/workflow.md) (section **PERFORMANCE ANALYSIS (Phase c2t-5)**)
- **Optimization strategy hub** (ordered checklist: advanced-patterns + optimizing-reference) â†’ **[references/optimization-strategy.md](./references/optimization-strategy.md)** â€” read **first** for attention/FMHA/Gemma; then drill into the two source docs as needed
- **Optimizing GEMM/BMM/attention** (after TMA, or Triton 10â€“20% slower) â†’ **[references/optimizing-reference.md](./references/optimizing-reference.md)** â€” EVEN_K fast path, transpose via pointer arithmetic, grid layout, autotune breadth, epilogue subtile; use these patterns during conversion and before perf sign-off (summarized in **optimization-strategy Â§2â€“Â§3**)
- **Gemma attention / GQA FMHA conversion** â†’ **[references/optimization-strategy.md Â§4](./references/optimization-strategy.md#4-gemma-fmha--gemma_attention-conversion-checklist-mandatory)**
- **Blackwell optimization** (complex kernels with iterative algorithms, register pressure, loop unrolling) â†’ **[references/optimizing-reference.md](./references/optimizing-reference.md) Â§9** â€” TMA descriptors, `loop_unroll_factor`, occupancy autotuning, TMEM-friendly block sizes, slab allocator, dual-path kernel design
- **âš ï¸ 10-50x REGRESSION** (catastrophic slowdown after conversion) â†’ **[translations/workflow.md](./translations/workflow.md)** â€” section **CRITICAL PERFORMANCE PATTERNS (AVOID 10-50x REGRESSION)**
- **âš ï¸ Good perf on `transpose=True` only, collapse on `transpose=False`** (or opposite) â†’ **[translations/advanced-patterns.md](./translations/advanced-patterns.md)** â€” Â§1 Dual layout flag; two `@triton.jit` kernels + `grid = lambda META: (... META["BLOCK_H"] ...)`

## Pre-flight Analysis (Run BEFORE converting)

```bash
# Count kernels (only main kernel gets @triton.jit, helpers stay plain def)
grep "@ct\.kernel" source.py | wc -l

# Check for patterns needing special handling
grep "ct\.transpose\|ct\.permute" source.py   # â†’ use tl.trans/tl.permute
grep "ct\.astype" source.py                    # â†’ use .to(dtype)
grep "ct\.load\|ct\.store" source.py          # â†’ TMA for 2D+ (tl.make_tensor_descriptor), NOT raw tl.load(ptr+offs)
grep "ct\.launch" source.py                    # â†’ bracket launch: kernel then [grid] then (args)
grep "ct\.Constant\|ct\.ConstInt" source.py    # â†’ tl.constexpr
grep "ct\.cdiv" source.py                      # â†’ triton.cdiv (host) or Python (a+b-1)//b
grep "ct\.bid\|ct\.num_blocks" source.py       # â†’ tl.program_id/tl.num_programs
grep "1 << .*\.bit_length" source.py           # â†’ triton.next_power_of_2 if needed
grep "transpose\|transpose_v" source.py       # â†’ if hit, read translations/advanced-patterns.md (dual kernels + META grid)
```

## Conversion Checklist

Copy this checklist and track progress:

```
Conversion Progress:
 [ ] Step 0 (attention / Gemma FMHA / GQA / soft cap / sliding window): Read [references/optimization-strategy.md](./references/optimization-strategy.md) and apply Â§4 checklist before inner-loop Triton
 [ ] Step 1: Pre-flight â€” run grep commands above, note special patterns and 2D+ loads (â†’ TMA)
 [ ] Step 2: Analyze source cuTile kernel (identify patterns, shapes, dtypes)
 [ ] Step 3: Create Triton file with correct structure (see translations/file-structure.md)
 [ ] Step 4: Convert kernel signature (tensor args â†’ pointer args, Constant â†’ constexpr)
 [ ] Step 4b: TMA (MANDATORY for 2D+ loads) â€” use tl.make_tensor_descriptor for every 2D+ tile load/store; do NOT ship raw tl.load(ptr+offs,mask) for block-shaped access (see workflow.md Â§ TMA OPTIMIZATION)
 [ ] Step 5: Convert kernel body (apply gotchas table below + API mapping)
 [ ] Step 6: Convert host wrapper (grid tuple/lambda, bracket-style launch: kernel, grid, then arguments; no ct.launch); call triton.set_allocator(alloc_fn) if using TMA
 [ ] Step 7: Validate â€” run pytest or syntax check on Triton file
 [ ] Step 8: Test â€” run pytest, verify X passed 0 failed
 [ ] Step 9: If test fails â†’ fix â†’ re-validate â†’ re-test (loop until green)
 [ ] Step 10: Benchmark â€” run perf test, compare vs cuTile (see workflow.md Â§ PERFORMANCE ANALYSIS)
 [ ] Step 10b: If GEMM/BMM/attention and Triton &gt;20% slower â†’ walk [references/optimization-strategy.md](./references/optimization-strategy.md) Â§2â€“Â§3 then [references/optimizing-reference.md](./references/optimizing-reference.md) (EVEN_K, transpose, grid, autotune, epilogue subtile), then re-benchmark
 [ ] Step 10c: If op has `transpose` / layout flag â†’ read [translations/advanced-patterns.md](./translations/advanced-patterns.md); verify **separate kernels** per layout (not transpose-kernel + `tl.trans`); **autotuned** launches use `lambda META: (triton.cdiv(..., META["BLOCK_H"]), ...)` â€” no fixed `BLOCK_H`/`BLOCK_N` through `apply()` unless autotune is disabled

Post-conversion Verification (TMA is mandatory for 2D+ loads):
 [ ] TMA: All 2D+ tile loads use tl.make_tensor_descriptor(...).load([...]); no raw ptr+mask for block-shaped 2D+ access (else 5x-20x regression)
 [ ] Grid uses tuple or lambda (not 3-tuple required like cuTile)
 [ ] Triton autotune added if cuTile op used kernel_configs/autotune (see workflow Â§ PERFORMANCE ANALYSIS)
 [ ] Host grid uses triton.cdiv where appropriate (not (a+b-1)//b only)
 [ ] Pointer/offset indexing: Triton uses element offsets (ptr + offs), not block index in tl.load (or use TMA descriptor)
 [ ] ct.astype(x, dtype) â†’ x.to(dtype) in Triton
 [ ] ct.mma(a, b, acc=acc) â†’ tl.dot(a, b, acc) (no keyword in Triton)
 [ ] Optional/None args: Triton allows None in kernel args if desired (cuTile required dummy+flag)
 [ ] Masking applied when BLOCK_SIZE > actual dimension (same as cuTile); with TMA, masks can often be removed for full tiles
 [ ] Reduction divisor uses actual_size, NOT BLOCK_SIZE
 [ ] fp32/tf32: Triton defaults allow_tf32=True; match cuTile behavior if you had explicit tf32 cast
 [ ] If any 2D+ load uses raw ptr+mask (exception only): document WHY TMA was not used
 [ ] tl.assume() alignment hints added for strides and pointers
```

## Gotchas (Most Common Translation Errors) {#gotchas-most-common-translation-errors}

Comprehensive table of patterns that frequently break or regress when porting `@ct.kernel` to `@triton.jit` â€” *mma accumulator, type cast, grid, TMA usage, dtype handling, layout flags, batched matmul, etc.*

**See:** [references/gotchas.md](./references/gotchas.md) â€” read this BEFORE writing the Triton kernel.

## Performance Gotchas (10-50x Regression Risk) {#performance-gotchas-10-50x-regression-risk}

**âš ï¸ These cause CATASTROPHIC slowdowns. Check BEFORE benchmarking.**

Patterns and their impact: TMA vs raw ptr+mask (5-20Ã—), autotune vs fixed tile sizes (2-3Ã—), `broadcast_to + tl.dot` (10-50Ã—), `extract_slice` chains (2-5Ã—), and more.

**See:** [references/performance-gotchas.md](./references/performance-gotchas.md) â€” full regression-risk table.

**Full details:** [translations/workflow.md](./translations/workflow.md) â€” section **CRITICAL PERFORMANCE PATTERNS (AVOID 10-50x REGRESSION)**.

Full API mapping: [references/api-mapping.md](./references/api-mapping.md).

Triton math dtype (erf/erfc/exp/log/sqrt) and the "don't substitute erf with tanh" pattern: [references/debugging.md](./references/debugging.md) â€” section **Triton Math Function Dtype Requirements (CRITICAL)**.

## Optimization strategy (hub)

**File:** [references/optimization-strategy.md](./references/optimization-strategy.md)

Summarizes **[translations/advanced-patterns.md](./translations/advanced-patterns.md)** (layout flags, dual kernels, autotune+`META`, batched launch, Blackwell pointers) and **[references/optimizing-reference.md](./references/optimizing-reference.md)** (post-TMA micro-opts, Â§9) into **Â§1â€“Â§3** plus a **mandatory Â§4 Gemma FMHA checklist**.

**Rule:** For **attention / FMHA / Gemma-style** conversions, open **optimization-strategy** in the same session as **workflow** â€” do not rely on TMA alone for perf sign-off.

## Reference Documents {#reference-documents}

Read from **cuTile â†’ Triton** perspective. Core files live in this skill under ``.

| Category | Document | Content |
|----------|----------|---------|
| **Strategy** | **[optimization-strategy.md](./references/optimization-strategy.md)** | **Ordered hub:** advanced-patterns + optimizing-reference; **Â§4 Gemma FMHA mandatory checklist** |
| **Workflows** | [translations/workflow.md](translations/workflow.md) | Standard c2t conversion (phases + checklist) |
| | [translations/file-structure.md](translations/file-structure.md) | Where to place Triton files when converting from cuTile |
| | **[translations/advanced-patterns.md](./translations/advanced-patterns.md)** | **Dual layout flags (transpose), autotune + `META` grid, MLA-style two kernels** |
| **API** | [api-mapping.md](./references/api-mapping.md) | cuTile â†’ Triton mapping |
| | [optimizing-reference.md](./references/optimizing-reference.md) | **GEMM/BMM/attention optimizations** (EVEN_K, transpose, grid, autotune, epilogue subtile) |
| **Gotchas** | [gotchas.md](./references/gotchas.md) | **Common cuTileâ†’Triton translation errors** (mma, dtype, grid, TMA, layout flags) |
| | [performance-gotchas.md](./references/performance-gotchas.md) | **10-50Ã— regression-risk table** (TMA vs ptr+mask, broadcast_to, extract_slice chains, autotune) |
| **Testing & errors** | [references/debugging.md](./references/debugging.md) | **Triton runtime errors** (cudaErrorIllegalAddress, pointer type, stride overflow) |

## Worked Examples

Use **cutile_kernel.py as source** and **triton_kernel.py as target**:

| Example | Directory | Complexity |
|---------|-----------|------------|
| Vector Add | [examples/01_vector_add/](examples/01_vector_add/) | Basic |
| Softmax | [examples/02_softmax/](examples/02_softmax/) | Intermediate |
| LayerNorm | [examples/03_layernorm/](examples/03_layernorm/) | Intermediate |
| MatMul | [examples/04_matmul/](examples/04_matmul/) | Advanced |
| Attention | [examples/05_attention/](examples/05_attention/) | Advanced |

Read `cutile_kernel.py` first, then `triton_kernel.py`, to see the inverse mapping.

## âš ï¸ MANDATORY COMPLETION CHECKLIST (DO NOT SKIP)

**A conversion is NOT COMPLETE until ALL items are checked. Copy and complete:**

```
MANDATORY COMPLETION GATES:
 [ ] 1. CORRECTNESS: pytest passes with 0 failures
     Command: python -m pytest {test_path} -k "test_op and triton" -vs --tb=short
     Gate: "X passed, 0 failed"

 [ ] 2. TMA OPTIMIZATION: All 2D+ tile loads use tl.make_tensor_descriptor
     Verify: grep -n "tl.load.*mask" triton_file.py | wc -l  # Should be 0 for 2D+ ops
     Skip = 5-20x performance regression

 [ ] 3. PERFORMANCE TEST: Triton within 20% of cuTile baseline
     Command: python -m pytest {test_path} -k "test_perf" --print-record -v
     OR: Run benchmark script: cd tests/benchmark && python bench_{op}.py
     Gate: Triton TFLOPS >= 0.8 * CuTile TFLOPS

 [ ] 4. PERFORMANCE COMPARISON RECORDED:
     Document results:
     | Config | Triton (TFLOPS) | CuTile (TFLOPS) | Ratio |
     |--------|-----------------|-----------------|-------|
     | [fill] | [fill]          | [fill]          | [fill]|

CONVERSION COMPLETE: All 4 gates passed? â†’ YES / NO
```

**Why this matters:**
- Gate 1 catches functional bugs
- Gate 2 prevents catastrophic 5-20x regressions (most common mistake)
- Gate 3 validates that optimization was effective
- Gate 4 creates accountability record

**If any gate fails:** Fix and re-verify before declaring complete.

