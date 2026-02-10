const AUTH_CHANGE_EVENT = 'auth-change';

export const notifyAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};

export const subscribeToAuthChanges = (handler: () => void) => {
  if (typeof window === 'undefined') return () => undefined;

  const wrappedHandler = () => handler();
  window.addEventListener(AUTH_CHANGE_EVENT, wrappedHandler);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, wrappedHandler);
  };
};

export const AUTH_EVENT_KEY = AUTH_CHANGE_EVENT;
