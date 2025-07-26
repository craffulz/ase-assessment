

-- Crear usuarios para scouts
-- Creando usuario para: John Mitchell
INSERT INTO users (email, password_hash, name, created_at)
VALUES (
  'john.mitchell@example.com',
  '$2b$10$hyJfTlKYNgPJY67OUMTyHuSy0yOFS6QAT6xO1cm/tTVRFgfSzlXAW',
  'John Mitchell',
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Creando usuario para: Maria Santos
INSERT INTO users (email, password_hash, name, created_at)
VALUES (
  'maria.santos@example.com',
  '$2b$10$ffpTu2KGviM//ZGcKNBlh.xN485v510vaO6Og7SLHQISEmJK4A0k2',
  'Maria Santos',
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Creando usuario para: Antonio López
INSERT INTO users (email, password_hash, name, created_at)
VALUES (
  'antonio.lópez@example.com',
  '$2b$10$Rdwx/max58SzxX2lsNxUi.V3tduL6QJNlSyS64wh4sDuIoDVmXfh.',
  'Antonio López',
  CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;

-- Crear perfiles de scouts
-- Creando perfil scout para: John Mitchell
INSERT INTO scouts (user_id, full_name, created_at)
SELECT id, 'John Mitchell', CURRENT_TIMESTAMP
FROM users WHERE email = 'john.mitchell@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Creando perfil scout para: Maria Santos
INSERT INTO scouts (user_id, full_name, created_at)
SELECT id, 'Maria Santos', CURRENT_TIMESTAMP
FROM users WHERE email = 'maria.santos@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Creando perfil scout para: Antonio López
INSERT INTO scouts (user_id, full_name, created_at)
SELECT id, 'Antonio López', CURRENT_TIMESTAMP
FROM users WHERE email = 'antonio.lópez@example.com'
ON CONFLICT (user_id) DO NOTHING;

-- Crear scouting reports
INSERT INTO scout_reports (
  player_id, scout_id, match_date, overall_rating,
  strengths, weaknesses, recommendation, created_at
) VALUES
(
        5,
        (SELECT user_id FROM scouts WHERE full_name = 'Maria Santos'),
        '2024-11-22',
        9,
        'Exceptional pace and acceleration; Outstanding dribbling skills in tight spaces; Natural goal-scoring instinct; Good decision-making in final third',
        'Needs to improve defensive tracking; Can be selfish in possession at times; Struggles against very physical defenders',
        'Exceptional young talent with world-class potentia',
        CURRENT_TIMESTAMP
      ),
(
        10,
        (SELECT user_id FROM scouts WHERE full_name = 'Antonio López'),
        '2024-11-18',
        9,
        'Exceptional passing range and accuracy; Excellent vision and game intelligence; Strong leadership qualities on the pitch; Versatile - can play multiple midfield roles',
        'Could be more aggressive in defensive situations; Sometimes holds onto the ball too long; Pace is not his strongest attribute',
        'World-class playmaker who would improve any team''s',
        CURRENT_TIMESTAMP
      );

COMMIT;
