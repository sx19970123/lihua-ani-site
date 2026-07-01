<script setup lang="ts">
import Modal from './Modal.vue'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const updateDate = '2026年6月18日'

interface Section {
  title: string
  items?: string[]
  list?: string[]
}

const sections: Section[] = [
  {
    title: '一、我们收集的信息',
    items: [
      '登录信息：当您使用手机号验证码登录时，我们会收集您输入的手机号和验证码校验结果，用于完成登录身份校验、识别账号和维持登录状态。',
      '账号资料：您可以自行设置或修改昵称、头像、性别、邮箱、个人中心背景等资料，用于在应用内展示您的个人资料和支持账号管理。',
      '使用数据：当您使用收藏、评分、追番印象、推荐反馈、番剧锐评、消息通知等功能时，我们会记录实现这些功能所必需的数据。',
      '设备与安全信息：为保障登录状态、接口安全和服务稳定，我们可能处理必要的设备环境、请求时间、网络状态等信息。我们不会基于这些信息做与服务无关的追踪。',
    ],
  },
  {
    title: '二、手机号的使用边界',
    items: [
      '您的手机号仅用于登录，包括发送或校验登录验证码、识别账号、维持登录状态、处理登录异常和必要的账号安全校验。',
      '我们不会将手机号用于番剧推荐、内容排序、用户画像、广告营销、公开展示或与动画数据源同步。',
      '我们不会将手机号提供给 bangumi-data、Bangumi API 或其他动画数据来源。',
      '如依法配合监管、司法机关或处理严重安全事件必须提供相关信息，我们会在法律允许范围内尽量控制范围。',
    ],
  },
  {
    title: '三、我们如何使用信息',
    list: [
      '完成手机号验证码登录、账号识别和登录状态维护。',
      '展示和保存您主动设置的个人资料。',
      '保存您的收藏、评分、偏好、追番印象、锐评和反馈。',
      '根据您主动录入或产生的使用数据提供推荐辅助、历史记录和个性化展示。',
      '排查接口异常、修复问题、保障服务器和账号安全。',
      '在法律法规允许或要求的范围内处理争议、投诉、安全事件和合规事项。',
    ],
  },
  {
    title: '四、动画数据同步来源',
    items: [
      '狸花番研部同步和整理的动画公共资料主要来自 bangumi-data 和 Bangumi API。',
      'bangumi-data GitHub 地址：github.com/bangumi-data/bangumi-data',
      'Bangumi API 文档地址：bangumi.github.io/api/',
      '这些来源提供动画条目、放送、站点链接、制作信息、评分等公开资料，不是用户个人信息来源。',
      '同步数据时不会携带您的手机号、登录验证码、收藏记录、偏好数据或其他个人资料。',
    ],
  },
  {
    title: '五、信息共享与第三方处理',
    items: [
      '除实现登录、短信验证码、附件存储、服务器托管、错误排查等必要服务外，我们不会主动向第三方出售、出租或交换您的个人信息。',
      '如需服务提供方协助（短信验证码、图片存储、云服务器），我们会要求其仅在必要范围内处理信息。',
      '当法律法规、行政监管、司法机关要求，或为保护用户、应用和公共安全所必需时，我们可能依法披露必要信息。',
      '第三方动画资料来源仅用于公共内容同步和展示，不参与用户账号体系，也不会接收您的手机号。',
    ],
  },
  {
    title: '六、信息保存与保护',
    items: [
      '我们会在实现本政策所述目的所需的期限内保存您的信息，超出必要期限后会删除、匿名化或停止使用。',
      '我们会采取合理的技术和管理措施保护信息安全，例如登录态校验、权限控制、数据隔离、接口访问控制和异常监控。',
      '如发生可能影响您权益的信息安全事件，我们会按法律法规要求采取补救措施，并以合理方式通知受影响用户。',
    ],
  },
  {
    title: '七、您的权利',
    items: [
      '您可以在应用内查看或修改昵称、头像、性别、邮箱、个人中心背景等资料。',
      '您可以管理自己的收藏、评分、偏好选择、推荐反馈和锐评记录。',
      '如您不再使用狸花番研部，可通过应用内账号注销或反馈渠道申请处理账号相关信息。',
      '如您认为个人信息存在错误、超范围使用，可通过应用内反馈渠道联系我们。',
    ],
  },
  {
    title: '八、未成年人信息保护',
    items: [
      '未成年人使用狸花番研部前应取得监护人同意。监护人发现未成年人信息被不当收集或使用的，可通过反馈渠道联系我们处理。',
    ],
  },
]
</script>

<template>
  <Modal :model-value="modelValue" title="隐私政策" max-width="max-w-2xl" @update:model-value="emit('update:modelValue', $event)">
    <p class="mb-1 text-xs text-[var(--fg-muted)]">更新日期：{{ updateDate }}</p>
    <p class="mb-6 rounded-xl border-l-4 border-brand-400 bg-brand-400/5 px-4 py-3 text-sm leading-relaxed text-[var(--fg-muted)]">
      狸花番研部重视您的个人信息保护。我们坚持必要、明确、克制的原则，只处理实现功能所需要的信息。
    </p>

    <div class="space-y-7">
      <article v-for="(s, i) in sections" :key="i">
        <h3 class="mb-3 text-sm font-bold">{{ s.title }}</h3>
        <div v-if="s.items" class="space-y-2.5">
          <p
            v-for="(item, ii) in s.items"
            :key="ii"
            class="flex gap-2 text-xs leading-relaxed text-[var(--fg-muted)]"
          >
            <span class="shrink-0 font-semibold text-brand-500">{{ ii + 1 }}.</span>
            <span>{{ item }}</span>
          </p>
        </div>
        <ul v-if="s.list" class="space-y-2">
          <li
            v-for="(li, li_i) in s.list"
            :key="li_i"
            class="flex gap-2 text-xs leading-relaxed text-[var(--fg-muted)]"
          >
            <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
            {{ li }}
          </li>
        </ul>
      </article>
    </div>
  </Modal>
</template>
