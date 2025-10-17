export const getCsrfToken = () => {
  // 从 document.cookie 中提取 csrftoken
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue || ''; 
};