"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
block_basekit_server_api_1.basekit.addDomainList(['alicloudapi.com', 'shumaidata.com']);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.Radio,
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
            component: block_basekit_server_api_1.FieldComponent.Input,
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text]
            },
            validator: {
                required: true,
            }
        },
    ],
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'companyName',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_company_name'),
                    primary: true,
                },
                {
                    key: 'creditNo',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_credit_no'),
                },
                {
                    key: 'companyCode',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('result_company_code'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.INTEGER
                    }
                },
                {
                    key: 'legalPerson',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_legal_person'),
                },
                {
                    key: 'orgCode',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_org_code'),
                },
                {
                    key: 'companyStatus',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_company_status'),
                },
                {
                    key: 'establishDate',
                    type: block_basekit_server_api_1.FieldType.DateTime,
                    title: t('result_establish_date'),
                    extra: {
                        dateFormat: block_basekit_server_api_1.DateFormatter.DATE_YMD_WITH_HYPHEN
                    }
                },
                {
                    key: 'issueDate',
                    type: block_basekit_server_api_1.FieldType.DateTime,
                    title: t('result_issue_date'),
                    extra: {
                        dateFormat: block_basekit_server_api_1.DateFormatter.DATE_YMD_WITH_HYPHEN
                    }
                },
                {
                    key: 'companyType',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_company_type'),
                },
                {
                    key: 'capital',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('result_capital'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.INTEGER
                    }
                },
                {
                    key: 'industry',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_industry'),
                },
                {
                    key: 'companyAddress',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_company_address'),
                },
                {
                    key: 'businessScope',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_business_scope'),
                },
                {
                    key: 'operationStartdate',
                    type: block_basekit_server_api_1.FieldType.DateTime,
                    title: t('result_operation_startdate'),
                    extra: {
                        dateFormat: block_basekit_server_api_1.DateFormatter.DATE_YMD_WITH_HYPHEN
                    }
                },
                {
                    key: 'operationEnddate',
                    type: block_basekit_server_api_1.FieldType.DateTime,
                    title: t('result_operation_enddate'),
                    extra: {
                        dateFormat: block_basekit_server_api_1.DateFormatter.DATE_YMD_WITH_HYPHEN
                    }
                },
                {
                    key: 'authority',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_authority'),
                },
                {
                    key: 'errorTips',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('result_error_tips'),
                },
                {
                    key: 'fetchTime',
                    type: block_basekit_server_api_1.FieldType.DateTime,
                    title: t('result_fetch_time'),
                    extra: {
                        dateFormat: block_basekit_server_api_1.DateFormatter.DATE_TIME_WITH_HYPHEN
                    }
                },
            ],
        },
    },
    execute: async (formItemParams, context) => {
        const { dataSource, appCode, keyword } = formItemParams;
        const { fetch } = context;
        let baseUrl = '';
        if (dataSource.value === 'shulian')
            baseUrl = `https://slycompany.market.alicloudapi.com/business2/get`;
        else if (dataSource.value === 'shumai')
            baseUrl = `https://businessstd.shumaidata.com/getbusinessstd`;
        else
            return { code: block_basekit_server_api_1.FieldCode.AuthorizationError, msg: 'No Authorization' };
        // @ts-ignore
        let params = new URLSearchParams({
            keyword: keyword[0].text,
        });
        let headers = {
            'Authorization': `APPCODE ${appCode}`,
            'Content-Type': 'application/json; charset=UTF-8'
        };
        let url = baseUrl + '?' + params.toString();
        const query = await fetch(url, {
            method: 'GET',
            headers: headers,
        });
        if (!query.ok) {
            // @ts-ignore
            console.log('User Query Error:', JSON.stringify(query));
            return { code: block_basekit_server_api_1.FieldCode.Error, msg: `Query Error: ${query.status}` };
        }
        const response = await query.json();
        // @ts-ignore
        console.log('User Query Success:', JSON.stringify(response));
        if (response.status !== 'success') {
            return { code: block_basekit_server_api_1.FieldCode.Error, msg: `Query Error: ${response.message}` };
        }
        return {
            code: block_basekit_server_api_1.FieldCode.Success,
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
        };
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFRNkM7QUFDN0MsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUE7QUFFbkIsa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUE7QUFFNUQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsbUJBQW1CLEVBQUUsU0FBUztnQkFDOUIsZ0JBQWdCLEVBQUUsU0FBUztnQkFDM0IsZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLDZCQUE2QixFQUFFLHNCQUFzQjtnQkFDckQsOEJBQThCLEVBQUUsMkJBQTJCO2dCQUMzRCxlQUFlLEVBQUUsVUFBVTtnQkFDM0IsZ0JBQWdCLEVBQUUsVUFBVTtnQkFDNUIscUJBQXFCLEVBQUUsTUFBTTtnQkFDN0Isa0JBQWtCLEVBQUUsVUFBVTtnQkFDOUIscUJBQXFCLEVBQUUsTUFBTTtnQkFDN0IscUJBQXFCLEVBQUUsT0FBTztnQkFDOUIsaUJBQWlCLEVBQUUsUUFBUTtnQkFDM0IsdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0IscUJBQXFCLEVBQUUsTUFBTTtnQkFDN0IsZ0JBQWdCLEVBQUUsTUFBTTtnQkFDeEIsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsd0JBQXdCLEVBQUUsTUFBTTtnQkFDaEMsdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsNEJBQTRCLEVBQUUsVUFBVTtnQkFDeEMsMEJBQTBCLEVBQUUsVUFBVTtnQkFDdEMsa0JBQWtCLEVBQUUsTUFBTTtnQkFDMUIsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0IsbUJBQW1CLEVBQUUsUUFBUTth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