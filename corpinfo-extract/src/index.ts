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
        'label_data_source': '信息接口提供商',
        'label_app_code': 'AppCode',
        'label_keyword': '工商信息关键词',
        'tooltip_data_source_tooltip': '请按照字段捷径使用文档选择数据接口提供商',
        'tooltip_app_code_placeholder': '请按照字段捷径使用文档获取 AppCode 以粘贴',
        'option_shumai': '阿里云市场-数脉',
        'option_shulian': '阿里云市场-数链',
        'result_company_name': '公司名称',
        'result_credit_no': '统一社会信用代码',
        'result_company_code': '公司代码',
        'result_legal_person': '法定代表人',
        'result_org_code': '组织机构代码',
        'result_company_status': '公司状态',
        'result_establish_date': '成立日期',
        'result_issue_date': '核准日期',
        'result_company_type': '公司类型',
        'result_capital': '注册资本',
        'result_industry': '行业',
        'result_company_address': '公司地址',
        'result_business_scope': '经营范围',
        'result_operation_startdate': '营业期限开始日期',
        'result_operation_enddate': '营业期限结束日期',
        'result_authority': '登记机关',
        'result_error_tips': '错误提示',
        'result_fetch_time': '数据获取时间',
      },
      'en-US': {},
      'ja-JP': {},
    }
  },

  formItems: [
    {
      key: 'dataSource',
      label: t('label_data_source'),
      tooltips: [
        { type: 'text', content: t('tooltip_data_source_tooltip') },
      ],
      defaultValue: 'shumai',
      component: FieldComponent.Radio,
      props: {
        options: [
          { label: t('option_shumai'), value: 'shumai' },
          { label: t('option_shulian'), value: 'shulian' },
        ]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'appCode',
      label: t('label_app_code'),
      component: FieldComponent.Input,
      props: {
        placeholder: t('tooltip_app_code_placeholder'),
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'keyword',
      label: t('label_keyword'),
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
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'companyName',
          type: FieldType.Text,
          title: t('result_company_name'),
          primary: true,
        },
        {
          key: 'creditNo',
          type: FieldType.Text,
          title: t('result_credit_no'),
        },
        {
          key: 'companyCode',
          type: FieldType.Number,
          title: t('result_company_code'),
          extra: {
            formatter: NumberFormatter.INTEGER
          }
        },
        {
          key: 'legalPerson',
          type: FieldType.Text,
          title: t('result_legal_person'),
        },
        {
          key: 'orgCode',
          type: FieldType.Text,
          title: t('result_org_code'),
        },
        {
          key: 'companyStatus',
          type: FieldType.Text,
          title: t('result_company_status'),
        },
        {
          key: 'establishDate',
          type: FieldType.DateTime,
          title: t('result_establish_date'),
          extra: {
            dateFormat: DateFormatter.DATE_YMD_WITH_HYPHEN
          }
        },
        {
          key: 'issueDate',
          type: FieldType.DateTime,
          title: t('result_issue_date'),
          extra: {
            dateFormat: DateFormatter.DATE_YMD_WITH_HYPHEN
          }
        },
        {
          key: 'companyType',
          type: FieldType.Text,
          title: t('result_company_type'),
        },
        {
          key: 'capital',
          type: FieldType.Number,
          title: t('result_capital'),
          extra: {
            formatter: NumberFormatter.INTEGER
          }
        },
        {
          key: 'industry',
          type: FieldType.Text,
          title: t('result_industry'),
        },
        {
          key: 'companyAddress',
          type: FieldType.Text,
          title: t('result_company_address'),
        },
        {
          key: 'businessScope',
          type: FieldType.Text,
          title: t('result_business_scope'),
        },
        {
          key: 'operationStartdate',
          type: FieldType.DateTime,
          title: t('result_operation_startdate'),
          extra: {
            dateFormat: DateFormatter.DATE_YMD_WITH_HYPHEN
          }
        },
        {
          key: 'operationEnddate',
          type: FieldType.DateTime,
          title: t('result_operation_enddate'),
          extra: {
            dateFormat: DateFormatter.DATE_YMD_WITH_HYPHEN
          }
        },
        {
          key: 'authority',
          type: FieldType.Text,
          title: t('result_authority'),
        },
        {
          key: 'errorTips',
          type: FieldType.Text,
          title: t('result_error_tips'),
        },
        {
          key: 'fetchTime',
          type: FieldType.DateTime,
          title: t('result_fetch_time'),
          extra: {
            dateFormat: DateFormatter.DATE_TIME_WITH_HYPHEN
          }
        },
      ],
    },
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
      console.log('User Query Error:', JSON.stringify(query))
      return {code: FieldCode.Error, msg: `Query Error: ${query.status}`}
    }
    const response = await query.json()
    // @ts-ignore
    console.log('User Query Success:', JSON.stringify(response))
    if (response.status !== 'success') {
      return {code: FieldCode.Error, msg: `Query Error: ${response.message}`}
    }

    return {
      code: FieldCode.Success,
      data: {
        id: `${Math.random()}`,
        companyName: response.data.data.companyName,
        creditNo: response.data.data.creditNo,
        companyCode: response.data.data.companyCode,
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
          && response.data.data.capital.includes('万人民币')
          ? (Number.parseFloat(response.data.data.capital.replace('万人民币', '')) * 10000).toFixed(6)
          : response.data.data.capital,
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
        errorTips: response.data.data.errorTips,
        fetchTime: new Date().toISOString(),
      }
    }
  },
})

export default basekit