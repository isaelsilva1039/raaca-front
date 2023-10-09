import DashboardOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import { DashboardDTO } from "@/core";

export default class ApiAdapter implements DashboardOutputPort {

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
                        "descritivo": "SET",
                        "valor": 22.57
                    },
                    {
                        "descritivo": "OUT",
                        "valor": 23.47
                    },
                    {
                        "descritivo": "NOV",
                        "valor": 41.82
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
                            "R$ 3.896,98"
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