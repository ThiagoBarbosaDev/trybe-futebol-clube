export const findOneMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export const findRoleMock = {
  role: 'admin',
};

export const validAdmin = { email: 'admin@admin.com', password: 'secret_admin' };

export const invalidAdminPassword = { email: 'admin@admin.com', password: 'invalid_password' };

export const emptyAdminPassword = { email: 'admin@admin.com', password: '' };

export const invalidEmail = { email: 'invalid_email', password: 'secret_admin' };

export const wrongEmail = { email: 'invalid_email@admin.com', password: 'secret_admin' };

export const noEmail = { password: 'password' };

export const successfulLoginResponse = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjcwMjU4NjQyLCJleHAiOjE2NzI4NTA2NDJ9.IzXh-zlvrbO3-Kfve-sIIBrUPfx_46gN8tW7LZO8QbA' }
