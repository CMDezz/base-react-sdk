import { createRoot } from 'react-dom/client';
import SDKControl from './components/SDKControl.tsx';
import './SavvySDKComp.ts';
import { DEFAULT_SDK_CONFIG } from './utils/config.ts';
import {
  InitializeError,
  SDK_ERROR_MESSAGES,
  SDKError,
} from './utils/errors.ts';
import ReactDOM from 'react-dom';
class EkycInstance {
  private context: SDKContext;
  private initialized: boolean;

  constructor() {
    this.initialized = false;
    this.context = {
      config: DEFAULT_SDK_CONFIG,
      shadowContainer: null,
      container: null,
    };
  }

  private checkSelector() {
    //check selector
    const container = document.querySelector(`div[is="savvy-sdk-comp"]`);
    const rootApp = document.body.firstElementChild;
    if (container && rootApp) {
      // this.context.shadowRoot = container.shadowRoot;
      // const shadowRoot = container.attachShadow({ mode: "open" });
      this.context.container = container;
      this.context.shadowContainer = container.shadowRoot;
    } else {
      // handling error here
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
    this.renderByTarget(this.context.config.core.TARGET, err);
  }

  private renderByTarget(target: string, err?: SDKError) {
    console.log(' this.context.container ', this.context.container);
    if (target === 'REACT') {
      ReactDOM.render(
        <SDKControl context={this.context} err={err} />,
        this.context.container
      );
    } else {
      if (!this.context.container) {
        throw new InitializeError(SDK_ERROR_MESSAGES.MISSING_CONTAINER);
      }
      createRoot(this.context.container).render(
        <SDKControl context={this.context} err={err} />
      );
    }
  }

  //init sdk
  initialize(config: SDKConfig) {
    try {
      this.validatePresequites(config);
      this.initialized = true;
    } catch (err) {
      console.log('@@err => ', err);
      this.errorProcessor(err as SDKError);
    }
  }

  //render ui ekyc
  render() {
    try {
      if (!this.initialized) {
        throw new InitializeError(SDK_ERROR_MESSAGES.NOT_INITIALIZED);
      }
      this.renderByTarget(this.context.config.core.TARGET);
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
