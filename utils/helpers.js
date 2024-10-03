

export const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };


export function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) return str; // Check if input is a string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

