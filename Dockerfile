# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de pacote
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Compilar a aplicação
RUN npm run build

# Estágio de produção com nginx
FROM nginx:alpine

# Copiar configuração personalizada do nginx
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Roteamento de SPA - servir index.html para todas as rotas
    location / {
        try_files \$uri /index.html;
    }

    # Compressão gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Copiar arquivos construídos do builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
