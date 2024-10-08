"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// const domain = 'https://shui-yin-zhao-pian-gai-lark-base.replit.app';
const domain = 'http://localhost:3000';
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['localhost', 'shui-yin-zhao-pian-gai-lark-base.replit.app']);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'text',
            label: t('label.input'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'date',
            label: t('label.fieldSelect.date'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'direction',
            label: t('label.fieldSelect.direction'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
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
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                placeholder: t('label.singleSelect.opacity'),
                options: (() => {
                    let arr = [];
                    for (let i = 0; i <= 10; i++) {
                        arr.push({ label: `${i * 10}%`, value: i * 10 });
                    }
                    return arr;
                })(),
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'text',
            label: t('label.input'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            }
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Attachment,
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const fileUrls = [];
        try {
            console.log(formItemParams);
            let { files, date, text, direction, opacity } = formItemParams;
            for (let i = 0; i < files.length; i++) {
                const url = files[i].tmp_url;
                let api = domain + `/addWatermark?opacity=${opacity.value}&url=${url}&time=${date ? new Date(date).getTime() + 1000 * 60 * 60 * 8 : '@NULL@'}&text=${text[0].text || text[0][0].text}&direction=${direction.value}`;
                console.log(JSON.stringify(text));
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                if (!data || !data['suc'])
                    continue;
                const { fileName } = data;
                const info = {
                    content: domain + `/out/${fileName}`,
                    name: fileName,
                    contentType: 'attachment/url',
                };
                fileUrls.push(info);
            }
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: fileUrls
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: block_basekit_server_api_1.FieldCode.Error
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsd0VBQXdFO0FBQ3hFLE1BQU0sTUFBTSxHQUFHLHVCQUF1QixDQUFDO0FBRXZDLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsRUFBQyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUM7QUFFbkYsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLGNBQWM7Z0JBQ3pDLHdCQUF3QixFQUFFLFdBQVc7Z0JBQ3JDLGFBQWEsRUFBRSxZQUFZO2dCQUMzQix5QkFBeUIsRUFBRSxVQUFVO2dCQUNyQyw2QkFBNkIsRUFBRSxTQUFTO2dCQUN4QyxnQ0FBZ0MsRUFBRSxLQUFLO2dCQUN2Qyw0QkFBNEIsRUFBRSxJQUFJO2dCQUNsQywrQkFBK0IsRUFBRSxJQUFJO2dCQUNyQyw2QkFBNkIsRUFBRSxJQUFJO2dCQUNuQyxnQ0FBZ0MsRUFBRSxJQUFJO2dCQUN0QywwQkFBMEIsRUFBRSxNQUFNO2dCQUNsQywyQkFBMkIsRUFBRSxNQUFNO2dCQUNuQyw0QkFBNEIsRUFBRSxNQUFNO2FBQ3JDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLDZEQUE2RDtnQkFDeEYsd0JBQXdCLEVBQUUsbURBQW1EO2dCQUM3RSxhQUFhLEVBQUUsd0NBQXdDO2dCQUN2RCx5QkFBeUIsRUFBRSw2Q0FBNkM7Z0JBQ3hFLDZCQUE2QixFQUFFLHNDQUFzQztnQkFDckUsZ0NBQWdDLEVBQUUsZUFBZTtnQkFDakQsNEJBQTRCLEVBQUUsVUFBVTtnQkFDeEMsK0JBQStCLEVBQUUsYUFBYTtn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