/**
 * 字体配置（统一入口）
 *
 * 霞鹜文楷（LXGW WenKai / LXGW WenKai Mono）通过自建的 npm 分包仓库
 * @callmebill/lxgw-wenkai-web 以 CDN CSS <link> 方式加载（见 FontSetup.astro），
 * 不走 Astro Font API（该字体为中文全量字体，Font API 的 fontsource 源
 * 每个字重是 8MB+ 的整包 woff2，而分片仓库按 unicode-range 按需加载）。
 *
 * 因此 fontsList 留空、selected 使用 "system"，body 与代码块字体在
 * FontSetup.astro 中直接以 font-family 指定。
 */
import type { FontDefinition, FontSelectionConfig } from "@/types/fontConfig";

// ─── Astro Font API 字体定义 ───────────────────────────────
export const fontsList: FontDefinition[] = [];

// ─── 字体选择与区域覆盖 ─────────────────────────────────────
export const fontConfig: FontSelectionConfig = {
	// 是否启用自定义字体功能（实际字体在 FontSetup.astro 中加载）
	enable: true,
	// 使用 "system" 表示不通过 Astro Font API 加载字体
	selected: ["system"],

	// 各区域独立字体设置留空，跟随全局设置
	bannerTitleFont: "",
	bannerSubtitleFont: "",
	navbarTitleFont: "",
	codeFont: "",
};
