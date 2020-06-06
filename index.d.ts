// Type definitions for vue-moment 4.0
// Project: https://github.com/brockpetrie/vue-easysession
// TypeScript Version: 2.7

import  EasySession  from './index';
import { PluginObject } from 'vue';

declare namespace VueEasySessionPlugin {
    interface Options {
        // The optional (self-maintained) moment instance
        vue?: EasySession;
    }

    interface VueStatic extends VueEasySession {
        (options: Options): void;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $session: VueEasySessionPlugin.VueStatic;
    }
}

interface VueEasySession extends PluginObject<undefined> {}

declare const VueEasySession: VueEasySession;
export = VueEasySession;
