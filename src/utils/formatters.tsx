import moment from "moment-jalaali";

export const formatCurrency = (amount?: number | string | null) =>
  amount != null ? new Intl.NumberFormat("fa-IR").format(Number(amount)) : "-";

export const formatJalaliDate = (
  dateString: string | Date,
  format = "jYYYY/jMM/jDD - HH:mm"
) => {
  if (!dateString) return "-";
  return moment(dateString).locale("fa").format(format);
};

export const formatRelativeTime = (dateString: string | Date): string => {
  if (!dateString) return "-";

  const now = moment();
  const date = moment(dateString);
  const diff = now.diff(date);

  if (diff < 60000) {
    return "همین الان";
  }

  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} دقیقه پیش`;
  }

  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ساعت پیش`;
  }

  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} روز پیش`;
  }

  if (diff < 2592000000) {
    const weeks = Math.floor(diff / 604800000);
    return `${weeks} هفته پیش`;
  }

  return moment(dateString).locale("fa").format("jYYYY/jMM/jDD");
};

export const formatRetryAfter = (retryAfter: number): string => {
  const hours = Math.floor(retryAfter / 3600);
  const minutes = Math.ceil((retryAfter % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours} ساعت و ${minutes} دقیقه` : `${hours} ساعت`;
  }

  return `${minutes} دقیقه`;
};
