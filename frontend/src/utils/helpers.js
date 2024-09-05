export const welcomeMessage = () => {
  const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

  if (hasSeenWelcome === "true") {
    return true;
  } else {
    return false;
  }
};
