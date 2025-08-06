import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_DgBRRX4-.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/projets/mPulse/","cacheDir":"file:///D:/projets/mPulse/node_modules/.astro/","outDir":"file:///D:/projets/mPulse/dist/","srcDir":"file:///D:/projets/mPulse/src/","publicDir":"file:///D:/projets/mPulse/public/","buildClientDir":"file:///D:/projets/mPulse/dist/","buildServerDir":"file:///D:/projets/mPulse/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"features/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/features","isIndex":false,"type":"page","pattern":"^\\/features\\/?$","segments":[[{"content":"features","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/features.astro","pathname":"/features","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"materiel/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/materiel","isIndex":false,"type":"page","pattern":"^\\/materiel\\/?$","segments":[[{"content":"materiel","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/materiel.astro","pathname":"/materiel","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"pricing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"solution/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/solution","isIndex":false,"type":"page","pattern":"^\\/solution\\/?$","segments":[[{"content":"solution","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solution.astro","pathname":"/solution","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/projets/mPulse/src/pages/about.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/features.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/materiel.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/pricing.astro",{"propagation":"none","containsHead":true}],["D:/projets/mPulse/src/pages/solution.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/features@_@astro":"pages/features.astro.mjs","\u0000@astro-page:src/pages/materiel@_@astro":"pages/materiel.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/solution@_@astro":"pages/solution.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B6zWuEmt.mjs","D:/projets/mPulse/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","D:/projets/mPulse/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.Cd5AgaYE.js","D:/projets/mPulse/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Qd9kgVET.js","D:/projets/mPulse/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BX_Et99U.js","D:/projets/mPulse/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.C3vWKHb-.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/projets/mPulse/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\"[data-tab]\").forEach(e=>{e.addEventListener(\"click\",()=>{document.querySelectorAll(\"[data-tab]\").forEach(t=>{t.classList.remove(\"border-primary\",\"text-primary\"),t.classList.add(\"text-gray-500\")}),e.classList.add(\"border-primary\",\"text-primary\"),e.classList.remove(\"text-gray-500\"),document.querySelectorAll(\"[data-tab-content]\").forEach(t=>{t.classList.add(\"hidden\")});const a=e.getAttribute(\"data-tab\"),r=document.querySelector(`[data-tab-content=\"${a}\"]`);r&&r.classList.remove(\"hidden\")})});document.querySelectorAll(\"[data-slide-target]\").forEach(e=>{e.addEventListener(\"click\",()=>{document.querySelectorAll(\"[data-slide-target]\").forEach(t=>{t.classList.remove(\"bg-primary\",\"text-white\"),t.classList.add(\"text-gray-600\",\"hover:text-primary\")}),e.classList.add(\"bg-primary\",\"text-white\"),e.classList.remove(\"text-gray-600\",\"hover:text-primary\"),document.querySelectorAll(\".carousel-item\").forEach(t=>{t.classList.add(\"hidden\")});const a=e.getAttribute(\"data-slide-target\"),r=document.querySelector(`[data-slide=\"${a}\"]`);r&&r.classList.remove(\"hidden\")})});function d(){const e=new Date,a=document.getElementById(\"update-time\");a&&(a.textContent=e.toLocaleString())}d();setInterval(d,1e3);"],["D:/projets/mPulse/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const n=document.getElementById(\"mobile-menu-button\"),e=document.getElementById(\"mobile-menu\");n&&e&&(n.addEventListener(\"click\",function(){const t=e.classList.toggle(\"hidden\");document.body.classList.toggle(\"menu-open\",!t),t||(e.style.opacity=\"0\",e.style.transform=\"translateY(-10px)\",setTimeout(()=>{e.style.opacity=\"1\",e.style.transform=\"translateY(0)\"},10))}),e.querySelectorAll(\"a\").forEach(t=>{t.addEventListener(\"click\",()=>{e.classList.add(\"hidden\"),document.body.classList.remove(\"menu-open\")})}))});"],["D:/projets/mPulse/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.getElementById(\"mobile-menu-button\"),e=document.getElementById(\"mobile-menu\"),d=document.getElementById(\"menu-open-icon\"),s=document.getElementById(\"menu-close-icon\");t&&t.addEventListener(\"click\",()=>{const n=t.getAttribute(\"aria-expanded\")===\"true\";t.setAttribute(\"aria-expanded\",(!n).toString()),n?(e&&(e.classList.add(\"h-0\"),e.classList.remove(\"h-auto\",\"py-2\")),d&&d.classList.remove(\"hidden\"),s&&s.classList.add(\"hidden\"),document.body.classList.remove(\"overflow-hidden\")):(e&&(e.classList.remove(\"h-0\"),e.classList.add(\"h-auto\",\"py-2\")),d&&d.classList.add(\"hidden\"),s&&s.classList.remove(\"hidden\"),document.body.classList.add(\"overflow-hidden\"))}),e&&e.querySelectorAll(\"a\").forEach(n=>{n.addEventListener(\"click\",()=>{e.classList.add(\"h-0\"),e.classList.remove(\"h-auto\",\"py-2\"),t&&t.setAttribute(\"aria-expanded\",\"false\"),d&&d.classList.remove(\"hidden\"),s&&s.classList.add(\"hidden\"),document.body.classList.remove(\"overflow-hidden\")})})});"]],"assets":["/_astro/bussiness.BLJwm_Y2.jpg","/_astro/client.BqBD2v9_.jpg","/_astro/transaction.Cw-qXbwD.png","/_astro/store.Dips_LJR.jpg","/_astro/stock.DCV-PSp4.jpg","/_astro/performance.CXB7UlXB.jpg","/_astro/dashboardF.CvOuAceS.png","/_astro/money.D-imOcvb.jpg","/_astro/staff.DEhhxS1m.jpg","/_astro/tpe.Cvoa0sIV.jpg","/_astro/khady.CJ0b6W2_.jpg","/_astro/guisse.oxfNtxVv.jpg","/_astro/ecommerce1.Bq8m-rUZ.jpg","/_astro/dashboard.B5xUsTM1.jpg","/_astro/autre.BH9_266G.jpg","/_astro/caisse.BaMnpUq_.jpg","/_astro/depense.st--y4Uf.jpg","/_astro/logo.3z1qC42E.jpg","/_astro/app-store.CgBidRAu.png","/_astro/play-store.B4HwYYYk.png","/_astro/about.B-3FHkaz.css","/favicon.svg","/_astro/Layout.astro_astro_type_script_index_1_lang.Cd5AgaYE.js","/about/index.html","/contact/index.html","/features/index.html","/materiel/index.html","/pricing/index.html","/solution/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"IR3QwX0XO9ndReZJA13JHWUAZLG8hHwqYKNZ55k9Rs4=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
