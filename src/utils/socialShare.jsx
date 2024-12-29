/**
 * @typedef {Object} ShareConfig
 * @property {string} url - URL to be shared.
 * @property {string} [title] - Optional title for the share.
 * @property {string} [description] - Optional description for the share.
 * @property {string} [image] - Optional image URL.
 * @property {string[]} [hashtags] - Optional list of hashtags.
 * @property {string} [via] - Optional Twitter via username.
 */
export const socialShare = {
  /**
   * Share to Facebook
   * @param {ShareConfig} config
   */
  facebook: (config) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      config.url
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  },

  /**
   * Share to Twitter
   * @param {ShareConfig} config
   */
  twitter: (config) => {
    const params = new URLSearchParams({
      url: config.url,
      text: config.title || "",
      ...(config.hashtags?.length && { hashtags: config.hashtags.join(",") }),
      ...(config.via && { via: config.via }),
    });

    const url = `https://twitter.com/intent/tweet?${params.toString()}`;
    window.open(url, "_blank", "width=600,height=400");
  },

  /**
   * Share to LinkedIn
   * @param {ShareConfig} config
   */
  linkedin: (config) => {
    const params = new URLSearchParams({
      url: config.url,
      title: config.title || "",
      summary: config.description || "",
      source: window.location.hostname,
    });

    const url = `https://www.linkedin.com/shareArticle?mini=true&${params.toString()}`;
    window.open(url, "_blank", "width=600,height=400");
  },

  /**
   * Share to Telegram
   * @param {ShareConfig} config
   */
  telegram: (config) => {
    const params = new URLSearchParams({
      url: config.url,
      text: config.title || "",
    });

    const url = `https://t.me/share/url?${params.toString()}`;
    window.open(url, "_blank", "width=600,height=400");
  },

  /**
   * Share to WhatsApp
   * @param {ShareConfig} config
   */
  whatsapp: (config) => {
    const text = config.title ? `${config.title} ${config.url}` : config.url;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  },

  /**
   * Share via email
   * @param {ShareConfig} config
   */
  email: (config) => {
    const subject = config.title || "Check this out";
    const body = `${
      config.description || "I thought you might be interested in this:"
    }\n\n${config.url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  },

  /**
   * Copy link to clipboard
   * @param {ShareConfig} config
   * @returns {Promise<boolean>}
   */
  copyLink: (config) => {
    return navigator.clipboard
      .writeText(config.url)
      .then(() => true)
      .catch(() => false);
  },
};
