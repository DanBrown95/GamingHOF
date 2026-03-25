<template>
	<div class="app">
		<Sidebar />
		<div class="content">
			<router-view :key="$route.path"/>
		</div>
	</div>
</template>

<script setup>
import Sidebar from '@/components/shared/SideBar.vue'
</script>

<style>
/* ─── Design Tokens ──────────────────────────────────────────── */
:root {
  --bg:            #eef1f5;
  --bg-raised:     #f5f7fa;
  --shadow-dark:   #c8ccd2;
  --shadow-light:  #ffffff;
  --accent:        #4ade80;
  --accent-dark:   #22c55e;
  --accent-dim:    rgba(74, 222, 128, 0.15);
  --sidebar-bg:    #1e293b;
  --text-primary:  #2d3748;
  --text-secondary:#64748b;
  --text-muted:    #94a3b8;
  --radius-sm:     10px;
  --radius-md:     16px;
  --radius-lg:     24px;
  --radius-xl:     32px;
  --transition:    0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --sidebar-collapsed: calc(2rem + 32px);
  --sidebar-expanded:  300px;

  /* Neumorphic shadow helpers */
  --neu-out:   6px 6px 14px var(--shadow-dark), -6px -6px 14px var(--shadow-light);
  --neu-out-lg: 10px 10px 22px var(--shadow-dark), -10px -10px 22px var(--shadow-light);
  --neu-in:    inset 4px 4px 10px var(--shadow-dark), inset -4px -4px 10px var(--shadow-light);
  --neu-in-sm: inset 3px 3px 7px var(--shadow-dark), inset -3px -3px 7px var(--shadow-light);
}

body.darkMode {
  --bg:            #1a2030;
  --bg-raised:     #1f2840;
  --shadow-dark:   #131824;
  --shadow-light:  #212838;
  --text-primary:  #e2e8f0;
  --text-secondary:#94a3b8;
  --text-muted:    #64748b;
  background-color: var(--bg);
}

/* ─── Global Reset ───────────────────────────────────────────── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  cursor: pointer;
}

/* ─── Layout ─────────────────────────────────────────────────── */
.app {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  margin-left: var(--sidebar-collapsed);
  transition: margin-left var(--transition);
  min-width: 0;
}
</style>
