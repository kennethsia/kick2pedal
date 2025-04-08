function Rules() {
  const docId = '1ByRPTQnisinm_WBd7YxxkBKhb-IjU1EG3_vdnIkAeUA';
  const embedUrl = `https://docs.google.com/document/d/${docId}/preview`;

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600px"
      title="Rules and Regulations"
      allowFullScreen
    ></iframe>
  );
}

export default Rules;
