# Mapa de ocorrências no RJ

Mapa interativo que colore as áreas de delegacia (CISPs) pelo volume de registros. A versão atual cobre **janeiro a julho de 2026** e inclui 137 áreas, com dados do [ISP-RJ](https://www.ispdados.rj.gov.br/estatistica.html).

## Como funciona

| Filtro | Unidade |
| --- | --- |
| Roubo de celular | Ocorrências registradas |
| Roubo de veículo | Ocorrências registradas |
| Homicídios consumados | Vítimas; exclui tentativas |

Cada filtro lê uma coluna independente do conjunto de dados. Ao trocar de categoria, o mapa atualiza as cores, os totais exibidos ao selecionar uma área e a legenda no canto inferior direito. Os números representam o total de cada área de delegacia, sem detalhamento por bairro, rua ou ponto da ocorrência. A base cartográfica é do OpenStreetMap, exibida com Leaflet.

## O que foi feito e atualizado

1. Implementação do mapa com polígonos por CISP e faixas de cor para roubos de celular.
2. Correção da posição da legenda: ela passou a ficar dentro do mapa, no canto inferior direito.
3. Inclusão de roubo de veículo e homicídios consumados em filtros independentes, com faixas próprias para homicídios.
4. Ajustes para celulares: filtro em linha própria em telas estreitas, controles maiores para toque e adaptação à orientação paisagem e às margens do aparelho.

## Executar localmente

Na raiz do repositório, execute:

```sh
python -m http.server 8000 --directory dist
```

Abra `http://localhost:8000`. O mapa base precisa de internet para carregar os blocos do OpenStreetMap.

A pasta `dist/` contém o HTML e os estilos, a lógica do mapa (`map.js`), os polígonos e os totais agregados (`areas.js`) e a biblioteca Leaflet.
