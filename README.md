# Mapa de ocorrências no RJ

Mapa interativo que colore as áreas de delegacia (CISPs) pelo volume de registros. O mapa inclui 137 áreas. Roubo de celular, roubo de veículo, homicídios e estupro cobrem **janeiro a julho de 2026**; assédio sexual cobre **janeiro a junho de 2026**, com dados do [ISP-RJ](https://www.ispdados.rj.gov.br/estatistica.html).

## Como funciona

| Filtro | Unidade | Período |
| --- | --- | --- |
| Roubo de celular | Ocorrências registradas | Janeiro a julho/2026 |
| Roubo de veículo | Ocorrências registradas | Janeiro a julho/2026 |
| Homicídios consumados | Vítimas; exclui tentativas | Janeiro a julho/2026 |
| Estupro | Vítimas | Janeiro a julho/2026 |
| Assédio sexual | Mulheres vítimas | Janeiro a junho/2026 |

Cada filtro lê uma coluna independente do conjunto de dados. Ao trocar de categoria, o mapa atualiza as cores, os totais exibidos ao selecionar uma área e a legenda no canto inferior direito. Os números representam o total de cada área de delegacia, sem detalhamento por bairro, rua ou ponto da ocorrência. A base cartográfica é do OpenStreetMap, exibida com Leaflet.

## O que foi feito e atualizado

1. Implementação do mapa com polígonos por CISP e faixas de cor para roubos de celular.
2. Correção da posição da legenda: ela passou a ficar dentro do mapa, no canto inferior direito.
3. Inclusão de roubo de veículo e homicídios consumados em filtros independentes, com faixas próprias para homicídios.
4. Ajustes para celulares: filtro em linha própria em telas estreitas, controles maiores para toque e adaptação à orientação paisagem e às margens do aparelho.

5. Inclusão de estupro e assédio sexual em filtros independentes. O período, a unidade, a fonte e a legenda acompanham a categoria selecionada.

## Validação da atualização de 24/11/2026

- Estupro: 959 linhas mensais (137 CISPs × 7 meses), sem duplicação de CISP/mês, com total de 3.696 vítimas.
- Assédio sexual: tabela pública do [ISP Mulher](https://ispconecta.rj.gov.br/ispmulher/), filtro Assédio sexual, área CISP e período 2 de janeiro a junho de 2026. As 93 linhas da comparação 2025/2026 reconciliam 174 mulheres vítimas em 2025 e 186 em 2026. As áreas sem registros no período atual recebem zero.
- Correspondência dos dois novos indicadores com as 137 geometrias; limites e valores das categorias anteriores preservados.
- Testes no navegador: cinco filtros, 137 áreas por filtro, totais, unidade, fonte e legenda; abertura do detalhe de assédio na 59ª DP com nove mulheres vítimas.
- A atualização não inclui divisão entre diurno e noturno.

[Consultar o mapa público](https://mapa-roubos-celular-rj.alexandretwofour.chatgpt.site/)

## Executar localmente

Na raiz do repositório, execute:

```sh
python -m http.server 8000 --directory dist
```

Abra `http://localhost:8000`. O mapa base precisa de internet para carregar os blocos do OpenStreetMap.

A pasta `dist/` contém o HTML e os estilos, a lógica do mapa (`map.js`), os polígonos e os totais agregados (`areas.js`) e a biblioteca Leaflet.
