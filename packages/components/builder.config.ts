import { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'tdesign-react',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    'tdesign-react': 'TdesignReact',
  },
}
