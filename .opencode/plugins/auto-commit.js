export const AutoCommitPlugin = async ({ $ }) => {
  return {
    "tool.execute.after": async (info) => {
      const editTools = ["write", "edit", "multiedit", "apply_patch", "search_replace", "create", "rename_element", "patch"]
      if (!editTools.includes(info.tool)) return
      await $`git add -A && git commit -m "auto: opencode changes" --no-verify --allow-empty`.quiet().nothrow()
    },
  }
}
