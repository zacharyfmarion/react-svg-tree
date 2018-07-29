export const imports = {
  'src/components/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-index" */ 'src/components/index.mdx'),
  'src/components/Tree/Tree.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-components-tree-tree" */ 'src/components/Tree/Tree.mdx'),
}
