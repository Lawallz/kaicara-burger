# Kaiçara Burger

Interface de hamburgueria desenvolvida com React, TypeScript, Vite e Tailwind CSS.

## Recursos da interface

- Cardápio com seleção e personalização de itens.
- Carrinho com alteração de quantidades e persistência em `localStorage`.
- Seções de apresentação, fidelidade, localização e horários.
- Alternância de alto contraste, com preferência salva no navegador.

## Executar localmente

Com Node.js e npm instalados:

```bash
git clone https://github.com/Lawallz/kaicara-burger.git
cd kaicara-burger
npm ci
npm run dev
```

O script inicia o Vite na porta `3000`. Abra o endereço exibido no terminal.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run lint` | Checar tipos com `tsc --noEmit` |
| `npm run build` | Gerar o build em `dist/` |
| `npm run preview` | Visualizar o build localmente |

## Onde editar

- [src/App.tsx](src/App.tsx): composição da página e estado do carrinho.
- [src/data/](src/data/): dados do cardápio.
- [src/components/](src/components/): seções, modais e carrinho.
- [public/](public/): imagens e logotipos.

O carrinho salvo no navegador é local ao dispositivo. Ele não representa, por si só, confirmação de recebimento de um pedido pelo estabelecimento.
