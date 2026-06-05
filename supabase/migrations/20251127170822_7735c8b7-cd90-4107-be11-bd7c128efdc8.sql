-- Add 5 new columns to store the additional questionnaire answers
ALTER TABLE leads 
ADD COLUMN cuidado_alimentacao text,
ADD COLUMN controle_alimentar text,
ADD COLUMN objetivo_alimentacao text,
ADD COLUMN dificuldade_alimentacao text,
ADD COLUMN interesse_app text;