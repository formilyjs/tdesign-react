import { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  externals: {},
  //当前仓库核心依赖的三方组件库名称
  targetLibName: 'tdesign-react',
  //核心三方库cjs目录名
  targetLibCjsDir: 'lib',
  //核心三方库es目录名
  targetLibEsDir: 'es',
  //是否打包全量类型文件
  bundleDts: false,
}