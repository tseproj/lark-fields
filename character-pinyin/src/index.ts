import {
  basekit,
  FieldType,
  FieldComponent,
  field,
  FieldCode
} from '@lark-opdev/block-basekit-server-api'
import { pinyin as usePinyin, addDict } from 'pinyin-pro'
// @ts-ignore
import CompleteDict from '@pinyin-pro/data/complete'

const { t } = field

basekit.addField({
  i18n: {
    messages: {
      'zh-CN': {
        'label_chinese_field': '待转换的汉字字段',
        'label_process_method': '非汉字字符处理方法',
        'label_tone': '声调处理方法',
        'label_bool': '处理模式',
        'label_separator': '自定义拼音分隔符',
        'option_removed': '直接移除',
        'option_consecutive': '紧凑输出',
        'option_spaced': '使用空格隔开输出',
        'option_symbol': '带声调符号',
        'option_number': '带数字后缀',
        'option_none': '不带声调',
        'option_pinyin': '完整拼音',
        'option_first': '输出拼音首字母',
        'option_surname': '使用姓氏拼音',
        'option_tov': '拼音ü输出v',
        'option_multiple': '单个汉字输出多音字',
        'tooltip_removed': '直接移除: “汉语pinyin”输出“汉语”; ',
        'tooltip_consecutive': '紧凑输出: “pinyin”原样输出; ',
        'tooltip_spaced': '使用空格隔开输出: “pinyin”输出“p i n y i n”',
        'tooltip_none': '不带声调: “汉语拼音”输出“han yu pin yin”; ',
        'tooltip_symbol': '带声调符号: “汉语拼音”输出“hàn yǔ pīn yīn”; ',
        'tooltip_number': '带数字后缀: “han4 yu3 pin1 yin1”',
        'tooltip_first': '拼音首字母: “汉语拼音”输出“h y p n”; ',
        'tooltip_surname': '姓氏拼音: “曾某”输出“zēng mǒu”; ',
        'tooltip_multiple': '多音字: 如“重”输出“chóng zhòng”, 仅单个字时有效；',
        'tooltip_tov': '拼音ü输出v: 带音调的 ǖ,ǘ,ǚ,ǜ 不会被转换',
        'tooltip_separator': '默认为空格，分隔符:“-”，输出示例:“pīn-yīn”',
        'placeholder_chinese_field': '请选择文本类型字段',
        'placeholder_separator': '请输入自定义分隔符',
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
      component: FieldComponent.Radio,
      // @ts-ignore
      tooltips: [
        { type: 'text', content: t('tooltip_removed') },
        { type: 'text', content: t('tooltip_consecutive') },
        { type: 'text', content: t('tooltip_spaced') },
      ],
      props: {
        options: [
          { label: t('option_removed'), value: 'removed' },
          { label: t('option_consecutive'), value: 'consecutive' },
          { label: t('option_spaced'), value: 'spaced' },
        ]
      },
    },
    {
      key: 'tone',
      label: t('label_tone'),
      component: FieldComponent.Radio,
      // @ts-ignore
      tooltips: [
        { type: 'text', content: t('tooltip_symbol') },
        { type: 'text', content: t('tooltip_number') },
        { type: 'text', content: t('tooltip_none') },
      ],
      props: {
        options: [
          { label: t('option_symbol'), value: 'symbol' },
          { label: t('option_number'), value: 'num' },
          { label: t('option_none'), value: 'none' },
        ]
      },
    },
    {
      key: 'bool',
      label: t('label_bool'),
      component: FieldComponent.MultipleSelect,
      // @ts-ignore
      tooltips: [
        { type: 'text', content: t('tooltip_first') },
        { type: 'text', content: t('tooltip_surname') },
        { type: 'text', content: t('tooltip_multiple') },
        { type: 'text', content: t('tooltip_tov') },
      ],
      props: {
        options: [
          { label: t('option_first'), value: 'first' },
          { label: t('option_surname'), value: 'surname' },
          { label: t('option_multiple'), value: 'multiple' },
          { label: t('option_tov'), value: 'tov' },
        ]
      },
    },
    {
      key: 'separator',
      label: t('label_separator'),
      component: FieldComponent.Input,
      // @ts-ignore
      tooltips: [
        { type: 'text', content: t('tooltip_separator') },
      ],
      props: {
        placeholder: t('placeholder_separator')
      },
    },
  ],

  resultType: {
    type: FieldType.Text,
  },

  execute: async (formItemParams) => {
    const { field, method, tone, separator, bool } = formItemParams
    let first = null, surname = null, multiple = null, tov = null
    if (bool) {
      ({ first, surname, multiple, tov } = bool.reduce((acc, option) => {
        acc[option.value] = true
        return acc
      }, { first: null, surname: null, multiple: null, tov: null }))
    }
    addDict(CompleteDict)

    const rawPinyin = usePinyin(
      field[0].text,
      {
        nonZh: method ? method.value : 'removed', // 非汉字字符处理方法
        toneType: tone ? tone.value : 'symbol', // 声调处理方法
        separator: separator || ' ', // 自定义拼音分隔符
        pattern: first ? 'first' : 'pinyin', // 输出模式
        surname: surname ? 'head' : 'off', // 姓氏模式
        multiple: !!multiple, // 多音字模式
        v: !!tov, // 拼音ü输出v
        segmentit: 2, // 分词算法,调试用
      }
    )
    // 标点符号输出优化
    const pinyin = rawPinyin.replace(/[ 。，？！「」・《》、；：（）]/g, match => {
      switch (match) {
        case ' ，': return ','
        case ' 。': return '.'
        case ' ？': return '?'
        case ' ！': return '!'
        case ' 「': return '「'
        case ' 」': return '」'
        case ' ・': return '・'
        case ' 《': return '《'
        case ' 》': return '》'
        case ' 、': return '、'
        case ' ；': return ';'
        case ' ：': return ':'
        case ' （': return '('
        case ' ）': return ')'
        default: return match;
      }
    })

    try {
      return {
        code: FieldCode.Success,
        data: pinyin,
      }
    }
    catch (error) {
      return {
        code: FieldCode.InvalidArgument,
        msg: `Invalid Input: ${error}`,
      }
    }
  },
})

export default basekit