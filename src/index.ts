import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType, DateFormatter } from '@lark-opdev/block-basekit-server-api';
const { t } = field;


// const domain = 'https://shui-yin-zhao-pian-gai-lark-base.replit.app';
const domain = 'http://localhost:3000';

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['localhost','shui-yin-zhao-pian-gai-lark-base.replit.app']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        'label.fieldSelect.files': '请选择PDF附件所在字段',
        'label.fieldSelect.date': '请选择时间所在字段',
        'label.input': '请输入水印自定义文字',
        'label.input.placeholder': '将显示在页面底部',
        'label.fieldSelect.direction': '请选择水印位置',
        'label.singleSelect.placeholder': '请选择',
        'label.singleSelect.leftTop': '左上',
        'label.singleSelect.leftBottom': '左下',
        'label.singleSelect.rightTop': '右上',
        'label.singleSelect.rightBottom': '右下',
        'label.singleSelect.cover': '覆盖全页',
        'label.singleSelect.center': '居中大字',
        'label.singleSelect.opacity': '不透明度',
      },
      'en-US': {
        'label.fieldSelect.files': 'Please select the field where the PDF attachment is located',
        'label.fieldSelect.date': 'Please select the field where the time is located',
        'label.input': 'Please enter the custom watermark text',
        'label.input.placeholder': 'Will be displayed at the bottom of the page',
        'label.fieldSelect.direction': 'Please select the watermark location',
        'label.singleSelect.placeholder': 'Please select',
        'label.singleSelect.leftTop': 'Left top',
        'label.singleSelect.leftBottom': 'Left bottom',
        'label.singleSelect.rightTop': 'Right top',
        'label.singleSelect.rightBottom': 'Right bottom',
        'label.singleSelect.cover': 'Cover the entire page',
        'label.singleSelect.center': 'Centered big text',
        'label.singleSelect.opacity': 'Opacity',
      },
      'ja-JP': {
        'label.fieldSelect.files': 'PDF添付ファイルを選択してください',
        'label.fieldSelect.date': '時間を選択してください',
        'label.input': '水印のカスタムテキストを入力してください',
        'label.input.placeholder': 'ページの下に表示されます',
        'label.fieldSelect.direction': '水印の位置を選択してください',
        'label.singleSelect.placeholder': '選択してください',
        'label.singleSelect.leftTop': '左上',
        'label.singleSelect.leftBottom': '左下',
        'label.singleSelect.rightTop': '右上',
        'label.singleSelect.rightBottom': '右下',
        'label.singleSelect.cover': '全体を埋め込む',
        'label.singleSelect.center': '大きなテキストを中央に配置する',
        'label.singleSelect.opacity': '不透明度',
      }
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'files',
      label: t('label.fieldSelect.files'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'text',
      label: t('label.input'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'date',
      label: t('label.fieldSelect.date'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.DateTime],
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'direction',
      label: t('label.fieldSelect.direction'),
      component: FieldComponent.SingleSelect,
      props: {
        placeholder: t('label.singleSelect.placeholder'),
        options: [
          {
            label: t('label.singleSelect.leftTop'),
            value: 'leftTop'
          },
          {
            label: t('label.singleSelect.leftBottom'),
            value: 'leftBottom'
          },
          {
            label: t('label.singleSelect.rightTop'),
            value: 'rightTop'
          },
          {
            label: t('label.singleSelect.rightBottom'),
            value: 'rightBottom'
          },
          {
            label: t('label.singleSelect.cover'),
            value: 'cover'
          },
          {
            label: t('label.singleSelect.center'),
            value: 'center'
          },
        ],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'opacity',
      label: t('label.singleSelect.opacity'),
      component: FieldComponent.SingleSelect,
      props: {
        placeholder: t('label.singleSelect.opacity'),
        options: (()=>{
          let arr = []
          for (let i = 0; i <= 10; i++) {
            arr.push({label: `${i*10}%`, value: i*10})
          }
          return arr
        })(),
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'text',
      label: t('label.input'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: any, context) => {
    const fileUrls = []
    try {
      console.log(formItemParams);
      
      let { files, date, text, direction, opacity } = formItemParams;
      
      for (let i = 0; i < files.length; i++) {
        const url = files[i].tmp_url
        let api = domain + `/addWatermark?opacity=${opacity.value}&url=${url}&time=${date ? new Date(date).getTime() + 1000 * 60 * 60 * 8 : '@NULL@'}&text=${text[0].text || text[0][0].text}&direction=${direction.value}`;
        console.log(JSON.stringify(text));
        
        const data = (await (await context.fetch(api, { method: 'GET' })).json());
        if (!data || !data['suc']) continue
        const { fileName } = data
        const info = {
          content: domain + `/out/${fileName}`,
          name: fileName,
          contentType: 'attachment/url',
        }
        fileUrls.push(info)
      }
      return {
        code: FieldCode.Success,
        data: fileUrls
      }
    } catch (error) {
      console.log(error);
      return {
        code: FieldCode.Error
      };
    }
  },
});
export default basekit;