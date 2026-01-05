/* eslint-disable @typescript-eslint/no-unused-vars */
// import { createRoot, Root } from 'react-dom/client';
import { createRoot } from 'preact/compat/client';
import styles from '../shared/styles/index.css?inline';
import SDKControl from './components/SDKControl.tsx';
import './SavvySDKComp.ts';
import { DEFAULT_SDK_CONFIG } from './utils/config.ts';
import {
  InitializeError,
  SDK_ERROR_MESSAGES,
  SDKError,
} from './utils/errors.ts';

const rootMap = new WeakMap<ShadowRoot, PreactRoot>();
// Create a single shared stylesheet instance
const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

class EkycInstance {
  private context: SDKContext;
  private initialized: boolean;
  private root: PreactRoot | null;
  constructor() {
    this.initialized = false;
    this.context = {
      config: DEFAULT_SDK_CONFIG,
      shadowContainer: null,
      container: null,
    };
    this.root = null;
  }

  private checkSelector() {
    //check selector
    const container = document.querySelector(`div[is="savvy-sdk-comp"]`);
    // const container = document.querySelector(`#savvy-sdk-comp`);
    if (container?.shadowRoot) {
      //Lưu lại giá trị root khi initialize
      //Lần sau chỉ cần render
      if (!this.root && !this.initialized) {
        const root = rootMap.get(container.shadowRoot);
        if (root) {
          rootMap.set(container.shadowRoot, root);
          this.root = root;
        }
      }

      // this.context.shadowRoot = container.shadowRoot;
      // const shadowRoot = container.attachShadow({ mode: "open" });
      this.context.container = container;
      this.context.shadowContainer = container.shadowRoot;
    } else {
      // handling error here
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_CONTAINER);
    }
  }

  private loadConfig(config: SDKConfig | undefined) {
    //check invalid
    if (typeof config == 'undefined' || !config) {
      throw new InitializeError(SDK_ERROR_MESSAGES.INVALID_CONFIG);
    }
    const { core, theme, module } = config;

    //check core
    if (!core?.API_KEY) {
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_API_KEY);
    }
    this.context.config.core = core;

    // assign theme
    if (typeof theme?.colors == 'object' && theme?.colors) {
      Object.keys(theme.colors).forEach((key) => {
        this.context.config.theme!.colors[key as keyof ThemeColors] =
          theme.colors[key as keyof ThemeColors];
      });
    }

    // assign module
    if (typeof module == 'object' && module) {
      Object.keys(module).forEach((key) => {
        this.context.config.module[key as keyof ModuleConfig] =
          module[key as keyof ModuleConfig];
      });
    }
  }
  private validatePresequites(config: SDKConfig) {
    this.checkSelector();
    this.loadConfig(config);
    // check more if needed
  }

  //handle error processors
  private errorProcessor(err: SDKError) {
    // this.renderUI(this.context.config.core.TARGET, err);
    this.renderUI(err);
  }

  private renderUI(err?: SDKError) {
    // this.container
    if (!this.context.container) {
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_CONTAINER);
    }

    if (!this.context.shadowContainer) {
      throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_CONTAINER);
    }

    if (this.context.shadowContainer.adoptedStyleSheets.length === 0) {
      this.context.shadowContainer.adoptedStyleSheets = [sheet];
    }

    //kiểm tra root mỗi lần rerender
    if (!this.root) {
      const root = createRoot(this.context.shadowContainer);
      rootMap.set(this.context.shadowContainer, root);
      this.root = root;
    }

    this.root.render(<SDKControl context={this.context} err={err} />);
  }

  //init sdk
  initialize(config: SDKConfig) {
    try {
      this.validatePresequites(config);
      this.initialized = true;
    } catch (err) {
      this.errorProcessor(err as SDKError);
    }
  }

  //render ui ekyc
  render() {
    try {
      if (!this.initialized) {
        throw new InitializeError(SDK_ERROR_MESSAGES.NOT_INITIALIZED);
      }
      this.renderUI();
    } catch (err) {
      this.errorProcessor(err as SDKError);
    }
  }

  //expose UI cemera processors
  //another sdk apis
}

declare global {
  interface Window {
    EkycInstance: typeof EkycInstance;
  }
}

window.EkycInstance = EkycInstance;
