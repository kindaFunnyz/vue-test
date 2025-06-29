import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";
import tsConfig from "@vue/eslint-config-typescript";
import prettierPlugin from "eslint-plugin-prettier";
export default defineConfig([
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintPluginVue.configs["vue3-essential"].rules,
      "vue/no-deprecated-v-bind-sync": "off",
      "vue/no-deprecated-v-on-native-modifier": "off",
      "vue/no-deprecated-destroyed-lifecycle": "off",
      "vue/no-v-for-template-key-on-child": "off",
      "vue/no-deprecated-slot-attribute": "off",
      "vue/no-mutating-props": "off",
      "prettier/prettier": "warn",
    },
  },
  tsConfig(),
]);
