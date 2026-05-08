# Calculadora Ponto

Aplicativo Ionic/Angular para registrar batidas de ponto, calcular horas trabalhadas por dia e acompanhar saldo em relação à jornada esperada.

## Stack

- Ionic 7.
- Angular 16.
- Capacitor 5.
- Bootstrap e Moment.js.

## Funcionalidades

- Registro de entradas e saídas por turno.
- Cálculo de minutos trabalhados por dia.
- Tolerância automática para arredondar jornadas próximas da carga esperada.
- Configuração da jornada esperada por data.
- Visualização por abas de ponto e calendário.
- Persistência local via `localStorage`.

## Estrutura

- `src/app/pages/punch-clock/`: tela de batida de ponto.
- `src/app/pages/calendar/`: visão de calendário.
- `src/app/components/`: componentes compartilhados, como abas e calendário.
- `src/app/services/punch.service.ts`: regras de armazenamento e cálculo de horas.

## Setup Local

```bash
npm install
npm start
```

## Comandos Úteis

- `npm run build`: gera o build web.
- `npm test`: executa os testes Angular.
- `npm run lint`: executa o lint.

## Observações

- Os dados ficam no navegador usando a chave `calculadora-ponto` no `localStorage`.
- Para builds mobile, use os comandos do Capacitor conforme a plataforma desejada.
