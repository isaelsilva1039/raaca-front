import DashboardApiOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import { DashboardDTO } from "@/core";

export default class ApiAdapter implements DashboardApiOutputPort {

    constructor() { }

    buscarDashboard(authorization: string) {
        const result:DashboardDTO =  {
            horizontalWidgets: [
                {
                    "icone": "./...",
                    "descritivo": "Ticket médio PIX",
                    "valor": "R$ 999.999,99"
                },
                {
                    "icone": "./...",
                    "descritivo": "Ticket médio POS",
                    "valor": "R$ 999.999,99"
                },
                {
                    "icone": "./...",
                    "descritivo": "Quantidade de transações PIX",
                    "valor": "875"
                },
                {
                    "icone": "./...",
                    "descritivo": "Quantidade de transações POS",
                    "valor": "542"
                }
            ],
            totalGeral: {
                "valor": "R$ 1.352,87",
                "variacao": -2.45,
                "data": [
                    {
                        "descritivo": "JAN",
                        "valor": 25060
                    },
                    {
                        "descritivo": "FEV",
                        "valor": 27980
                    },
                    {
                        "descritivo": "MAR",
                        "valor": 42800
                    },
                    {
                        "descritivo": "ABR",
                        "valor": 32400
                    },
                    {
                        "descritivo": "MAI",
                        "valor": 35200
                    },
                    {
                        "descritivo": "JUN",
                        "valor": 38200
                    },
                    {
                        "descritivo": "JUL",
                        "valor": 52160
                    },
                    {
                        "descritivo": "AGO",
                        "valor": 42400
                    },
                    {
                        "descritivo": "SET",
                        "valor": 35200
                    },
                    {
                        "descritivo": "OUT",
                        "valor": 38200
                    },
                    {
                        "descritivo": "NOV",
                        "valor": 52160
                    },
                    {
                        "descritivo": "DEZ",
                        "valor": 42400
                    }
                ]
            },
            totalTransacoes: [
                {
                    "titulo": "PIX",
                    "descritivo": "Total transações PIX",
                    "valor": "R$ 1.352,87",
                    "variacao": -2.45
                },
                {
                    "titulo": "POS",
                    "descritivo": "Total transações POS",
                    "valor": "R$ 1.352,87",
                    "variacao": -2.45
                }
            ],
            tabelas: [
                {
                    "titulo": "Transações PIX",
                    "header": [
                        "chave",
                        "Participação",
                        "quantidade",
                        "Total"
                    ],
                    "body": [
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 1.296,98"
                        ],
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ]
                    ]
                },
                {
                    "titulo": "Transações POS",
                    "header": [
                        "Flavor",
                        "Participação",
                        "quantidade",
                        "Total"
                    ],
                    "body": [
                        [
                            "Pagseguro",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "Stone",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "Vero",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ]
                    ]
                }
            ],
        }
        return result;
    }
}