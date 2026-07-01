<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
import PrivacyModal from '@/components/common/PrivacyModal.vue'
import DonateModal from '@/components/common/DonateModal.vue'
import ChangelogModal from '@/components/common/ChangelogModal.vue'
import { useModal } from '@/composables/useModal'

const { active, close } = useModal()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <main class="flex-1 pt-16">
      <RouterView />
    </main>
    <Footer />

    <!-- 全局弹窗 -->
    <PrivacyModal :model-value="active === 'privacy'" @update:model-value="(v) => !v && close()" />
    <DonateModal :model-value="active === 'donate'" @update:model-value="(v) => !v && close()" />
    <ChangelogModal :model-value="active === 'changelog'" @update:model-value="(v) => !v && close()" />
  </div>
</template>
