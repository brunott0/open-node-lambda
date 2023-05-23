*Lambda*

# listFormulas

  Executa uma função em NodeJS que lista itens de uma tabela do DynamoDB e permite paginar os resultados. 
  Também é possível filtrar os resultados através dos parâmetros "zfab" ou "redirectUrl", dessa forma a busca será feita no índice correspondente.

  Permissões: ler itens da tabela do DynamoDB (DynamoDBReadPolicy)

  Variaveis de ambiente:
    FORMULAS_TABLE: Nome da tabela do Dynamo
    ZFAB_INDEX: Nome do índice criado para o atributo "zfab"
    REDIRECT_URL_INDEX: Nome do índice criado para o atributo "redirectUrl"

  Runtime: nodejs16.x

# getFormula

 Executa uma função em NodeJS que busca um item no DynamoDB através do id (chave primária).

 Permissões: ler itens da tabela do DynamoDB (DynamoDBReadPolicy)

 Variaveis de ambiente:
   FORMULAS_TABLE: Nome da tabela do Dynamo

 Runtime: nodejs16.x

# updateFormula

 Executa uma função em NodeJS que atualiza um item no DynamoDB, identificado através da sua chave primária.
 
 Permissões: ler e alterar itens da tabela do DynamoDB (DynamoDBReadPolicy, DynamoDBWritePolicy).

 Variaveis de ambiente:
  FORMULAS_TABLE: Nome da tabela do Dynamo

 Runtime: nodejs16.x

*-----------------------------------------------------------------------------------------------------------------*

*APIs*

  GET /formulas

    Método que invoca a lambda "listFormulas"

  GET /formulas/{formulaId}

    Método que invoca a lambda "getFormula"

  PATCH /formulas/{formulaId}

    Método que invoca a lambda "updateFormula"

*-----------------------------------------------------------------------------------------------------------------*

*DynamoDB*

  Tabela que contém as fórmulas dos produtos provenientes do LIMS. Terá como chave primária o atributo "id" (partition key).
  Possuirá dois GSI (Global Secondary Index): "redirectUrl-index" e "zfab-index", referentes ao atributos "redirectUrl" e "zfab".

  Propriedades:

    TableName: FormulasTable
  
    KeySchema:      
      AttributeName: "id"
      KeyType: "HASH"
    
  GlobalSecondaryIndexes:
    IndexName: "redirectUrl-index"
      KeySchema:      
      AttributeName: "redirectUrl"
      KeyType: "HASH"

    IndexName: "zfab-index"
      KeySchema:      
      AttributeName: "zfab"
      KeyType: "HASH"

  Schema:
   {
     id: string
     redirectUrl: string
     originalUrl: string
     zfab: string
     enabled: bool
     composition: {
       locale: string
       ingredients: string[]
     }[]
     createdAt: number
     updatedAt: number
   }