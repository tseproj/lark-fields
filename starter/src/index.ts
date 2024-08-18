import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

basekit.addField({
  formItems: [
    {
      key: 'url',
      label: '请输入需要转附件的URL',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text]
      },
      validator: {
        required: true,
      }
    },
  ],

  resultType: {
    type: FieldType.Attachment,
  },

  execute: async (formItemParams, context) => {
    const { url } = formItemParams;
    if (Array.isArray(url)) {
      return {
        code: FieldCode.Success,
        data: (url.map(({ link }, index) => {
          if (!link) {
            return undefined
          }
          const name = link.split('/').slice(-1)[0];
          return {
            name: '随机名字' + index + name,
            content: link,
            contentType: "attachment/url"
          }
        })).filter((v) => v)
      }
    }
    return {
      code: FieldCode.Error,
    }
  },
})

export default basekit