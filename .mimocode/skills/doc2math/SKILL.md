---
name: doc2math
description: "Use when working with doc2math"
---

---
name: doc2math
description: Convert narrative technical documents into grounded Mathematical Problem Specifications with variables, constraints, objectives, and uncertainty.
risk: safe
source: community
date_added: "2026-05-31"
---

# DOC2MATH â€” Document-to-Mathematics Problem Specification

## When to Use This Skill

- "Formalize this problem statement into math"
- "Extract the mathematical structure from this research paper section"
- "What variables, constraints, and objectives are in this spec?"
- "Convert this word problem to a structured MPS"
- "Find what's missing in this problem formulation"

## Zero-Inference Protocol (Mandatory)

1. **Closed World** â€” if it is not stated in the document, it does not exist in output
2. **Grounding Rule** â€” every element must cite the exact source phrase (`"evidence"` field)
3. **No Silent Filling** â€” unknown values use `null`; ambiguous types use `"ambiguous"`
4. **Inference Tagging** â€” structural inferences tagged `"inferred": true` with `"inference_basis"`
5. **MISSING Markers** â€” elements mentioned but insufficiently defined get `"status": "MISSING"` with `"missing_reason"`
6. **No Hallucinated Math** â€” never introduce equations or values not in the source text

## Limitations

- Does not invent missing equations, domains, values, or assumptions that are absent from the source document.
- Requires enough source text to cite every extracted element; sparse prompts should be returned with explicit missing-information markers.
- Produces a formal specification, not a solved optimization model or proof.

## How It Works

### Step 1 â€” Receive Document

Accept the document text, research excerpt, problem description, or specification as input.

### Step 2 â€” Classify

Identify `problem_class`: `optimization | classification | simulation | proof | estimation | other`

### Step 3 â€” Extract MPS Components

**Variables** â€” `id`, `name`, `symbol`, `type`, `domain`, `units`, `role`, `evidence`, `inferred`, `status`

**Operators** â€” `id`, `name`, `symbol`, `arity`, `acts_on`, `produces`, `evidence`, `inferred`

**Constraints** â€” `id`, `type`, `expression`, `variables_involved`, `evidence`, `hardness`, `inferred`, `status`

**Objectives** â€” `id`, `direction` (minimize/maximize/satisfy/find/prove), `expression`, `variables_involved`, `evidence`, `inferred`

**Uncertainty** â€” `id`, `type` (stochastic/epistemic/measurement/model/none_stated), `affects`, `characterization`, `evidence`, `status`

### Step 4 â€” Surface Missing Information

Identify what the document implies but doesn't state: `missing_information[]` with `element`, `needed_for`, `missing_reason`.

### Step 5 â€” Validate and Score

`validation_flags`:
- `has_complete_objectives`: true/false/partial
- `has_bounded_variables`: true/false/partial
- `has_evidence_for_all_elements`: true/false/partial
- `inference_count`: integer
- `missing_count`: integer
- `overall_formalizability`: HIGH/MEDIUM/LOW

## Output Format

Produce the complete MPS as a JSON object:

```json
{
  "mps_version": "1.0",
  "source_title": "...",
  "problem_class": "optimization",
  "variables": [...],
  "operators": [...],
  "constraints": [...],
  "objectives": [...],
  "uncertainty": [...],
  "missing_information": [...],
  "validation_flags": {
    "overall_formalizability": "HIGH"
  }
}
```

## Best Practices

- âœ… Apply all 6 Zero-Inference Protocol rules before outputting any element
- âœ… Surface MISSING markers rather than silently inferring â€” incomplete formalization is valid output
- âœ… Cite the exact source phrase in every `evidence` field
- âŒ Never introduce mathematical relationships not grounded in the source text

## Additional Resources

- Repository: [thebrierfox/doc2math-skill](https://github.com/thebrierfox/doc2math-skill)
- Full BYOK tool: [ace-license-server-production.up.railway.app/byok/doc2math](https://ace-license-server-production.up.railway.app/byok/doc2math)
- Built by [IntuiTekÂ¹](https://intuitek.ai) (~KÂ¹) â€” MIT License

