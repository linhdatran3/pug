import { transformObjectToParams } from '@/utils';

function getScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export class ApiRepository {
  baseUrl = '';

  scriptCacher = {};

  getScript = getScript;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  getUrl(path, params) {
    let url = this.baseUrl + path;

    if (typeof params === 'object') {
      url += `?${transformObjectToParams(params)}`;
    }

    return url;
  }

  loadScript(url) {
    if (!this.scriptCacher[url]) {
      this.scriptCacher[url] = getScript(url);
    }

    return this.scriptCacher[url];
  }

  get(path, data) {
    return new Promise((resolve, reject) => {
      const url = this.getUrl(path);

      $.ajax({
        url,
        data,
        method: 'get',
      })
        .done(resolve)
        .catch(reject);
    });
  }

  post(path, data = {}) {
    return new Promise((resolve, reject) => {
      const url = this.getUrl(path);

      $.ajax({
        url,
        data,
        method: 'post',
      })
        .done(resolve)
        .catch(reject);
    });
  }

  put(path, data = {}) {
    return new Promise((resolve, reject) => {
      const url = this.getUrl(path);

      $.ajax({
        url,
        data,
        method: 'put',
      })
        .done(resolve)
        .catch(reject);
    });
  }

  async resolveJSON(data) {
    if (typeof data === 'object') {
      return data;
    }

    const response = await this.get(data);

    return response;
  }
}

export default new ApiRepository();
