import {
  basekit,
  FieldType,
  FieldComponent,
  NumberFormatter,
  DateFormatter,
  field,
  FieldCode
} from '@lark-opdev/block-basekit-server-api'
const { t } = field

basekit.addDomainList(['alicloudapi.com', 'shumaidata.com'])

basekit.addField({
  i18n: {
    messages: {
      'zh-CN': {
        'label_chinese_field': '待转换的汉字字段',
        'label_process_method': '非汉字字符处理方法',
        'option_removed': '直接移除',
        'option_consecutive': '紧凑输出',
        'option_spaced': '使用空格隔开输出',
        'placeholder_chinese_field': '请选择文本类型字段',
      },
      'en-US': {},
      'ja-JP': {},
    }
  },

  formItems: [
    {
      key: 'field',
      label: t('label_chinese_field'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
        placeholder: t('placeholder_chinese_field')
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'method',
      label: t('label_process_method'),
      defaultValue: 'removed',
      component: FieldComponent.Radio,
      props: {
        options: [
          {
            label: t('option_removed'),
            value: 'removed',
          },
          {
            label: t('option_consecutive'),
            value: 'consecutive',
          },
          {
            label: t('option_spaced'),
            value: 'spaced',
          },
        ]
      },
      validator: {
        required: true,
      },
    },
  ],

  resultType: {
    type: FieldType.Text,
  },

  execute: async (formItemParams, context) => {
    const { dataSource, appCode, keyword } = formItemParams
    const { fetch } = context

    let baseUrl = ''
    if (dataSource.value === 'shulian')
      baseUrl = `https://slycompany.market.alicloudapi.com/business2/get`
    else if (dataSource.value === 'shumai')
      baseUrl = `https://businessstd.shumaidata.com/getbusinessstd`
    else
      return { code: FieldCode.AuthorizationError, msg: 'No Authorization' }

    // @ts-ignore
    let params = new URLSearchParams({
      keyword: keyword[0].text,
    })
    let headers = {
      'Authorization': `APPCODE ${appCode}`,
      'Content-Type': 'application/json; charset=UTF-8'
    }
    let url = baseUrl + '?' + params.toString()

    const query = await fetch(url, {
      method: 'GET',
      headers: headers,
    })
    if (!query.ok) {
      // @ts-ignore
      console.log('Query Error:', JSON.stringify(query))
      if (query.status === 403) {
        return {code: FieldCode.QuotaExhausted, msg: `Query Error: ${query.status}`}
      }
      return {code: FieldCode.Error, msg: `Query Error: ${query.status}`}
    }
    const response = await query.json()
    // @ts-ignore
    console.log('Response Success:', JSON.stringify(response))

    return {
      code: FieldCode.Success,
      data: {
        id: `${Math.random()}`,
        companyName: response.data.data.companyName,
        creditNo: response.data.data.creditNo,
        companyCode: response.data.data.companyCode
          ? Number(response.data.data.companyCode)
          : undefined,
        legalPerson: response.data.data.legalPerson,
        orgCode: response.data.data.orgCode,
        companyStatus: response.data.data.companyStatus,
        establishDate: response.data.data.establishDate
          ? new Date(response.data.data.establishDate.split(' ')[0]).getTime()
          : undefined,
        issueDate: response.data.data.issueDate
          ? new Date(response.data.data.issueDate.split(' ')[0]).getTime()
          : undefined,
        companyType: response.data.data.companyType,
        capital: response.data.data.capital
          ? response.data.data.capital.includes('万人民币')
            ? Number((Number.parseFloat(response.data.data.capital.replace('万人民币', '')) * 10000).toFixed(6))
            : Number(response.data.data.capital)
          : undefined,
        industry: response.data.data.industry,
        companyAddress: response.data.data.companyAddress,
        businessScope: response.data.data.businessScope,
        operationStartdate: response.data.data.operationStartdate
          ? new Date(response.data.data.operationStartdate.split(' ')[0]).getTime()
          : undefined,
        operationEnddate: response.data.data.operationEnddate
          ? new Date(response.data.data.operationEnddate.split(' ')[0]).getTime()
          : undefined,
        authority: response.data.data.authority,
        fetchTime: Date.now(),
      }
    }
  },
})

export default basekit