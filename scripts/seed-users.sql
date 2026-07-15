-- Script de seed de usuários de teste para o banco de dados do Mahal Commerce (PostgreSQL)
-- Senhas correspondentes (todas usam criptografia BCrypt):
-- dev      -> Dev@secure1!
-- admin    -> Admin@secure1!
-- gerente  -> Gerente@secure1!
-- vendedor -> Vendedor@secure1!
-- cliente  -> Cliente@secure1!

-- 1. Inserir usuários de teste
INSERT INTO users (username, password, email, enabled, email_verified, auth_provider) VALUES
    ('dev', '$2b$12$Sdtp0cKibTmiK8Nee6xiiujzohG7ViwZ4hSN9zJ2vQytCII18sxvy', 'dev@system.internal', true, true, 'LOCAL'),
    ('admin', '$2b$12$vI.Vz5sb30njQB1GQgoFS.ZBK7cxIGNDVVo5s9imdolrhKISZzRhC', 'admin@system.internal', true, true, 'LOCAL'),
    ('gerente', '$2b$12$HSPOaoyYQjx7cK0TwuQa7OCi.eBPmTyKgSrfUGI6pklaANe1Qw/26', 'gerente@system.internal', true, true, 'LOCAL'),
    ('vendedor', '$2b$12$KnnzmTWJTPd3l4dOmSUCv.a0eygwrM523UFpxA1dcLGev//WiV5de', 'vendedor@system.internal', true, true, 'LOCAL'),
    ('cliente', '$2b$12$l4gTat9WPtdk/BcaPMggy.HlnZ.cfxszfzYvqemvMAPrXaQNcMU.u', 'cliente@system.internal', true, true, 'LOCAL')
ON CONFLICT (username) DO NOTHING;

-- 2. Associar as roles correspondentes a cada usuário
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'dev' AND r.name = 'ROLE_DEV'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'gerente' AND r.name = 'ROLE_ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'vendedor' AND r.name = 'ROLE_USER'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'cliente' AND r.name = 'ROLE_USER'
ON CONFLICT DO NOTHING;
