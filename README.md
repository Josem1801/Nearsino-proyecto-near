### Nearsino

==================

Apuesta y gana

# Inicio rápido

Para ejecutar este proyecto localmente:

1. Requisitos previos: asegúrese de haber instalado [Node.js] ≥ 12
2. Instalar dependencias: `yarn install`
3. Ejecute el servidor de desarrollo local: `yarn dev` (consulte` package.json` para
   lista completa de `scripts` que puede ejecutar con` yarn`)

¡Ahora tendrá un entorno de desarrollo local respaldado por NEAR TestNet!

Adelante, juega con la aplicación y el código. A medida que realiza cambios en el código, la aplicación se recargará automáticamente.

# Explorando el código

1. El código "backend" reside en la carpeta `/ contract`. Vea el archivo README allí para
   más información.
2. El código de la interfaz reside en la carpeta `/ src`. `/ src / index.html` es un gran
   lugar para comenzar a explorar. Tenga en cuenta que se carga en `/ src / index.js`, donde
   puede aprender cómo la interfaz se conecta a la cadena de bloques NEAR.
3. Pruebas: existen diferentes tipos de pruebas para la interfaz y la interfaz inteligente.
   contrato. Consulte `contract / README` para obtener información sobre cómo se prueba. La interfaz
   el código se prueba con [jest]. Puede ejecutar ambos a la vez con `yarn run test`.

# Implementar

Cada contrato inteligente en NEAR tiene su [propia cuenta asociada] [cuentas cercanas]. Cuando ejecuta `yarn dev`, su contrato inteligente se implementa en NEAR TestNet en vivo con una cuenta desechable. Cuando esté listo para hacerlo permanente, aquí le explicamos cómo hacerlo.

## Paso 0: Instale near-cli (opcional)

[near-cli] es una interfaz de línea de comandos (CLI) para interactuar con la cadena de bloques NEAR. Se instaló en la carpeta local `node_modules` cuando ejecutó` yarn install`, pero para una mejor ergonomía, es posible que desee instalarlo globalmente:

    instalación de hilo - global near-cli

O, si prefiere usar la versión instalada localmente, puede prefijar todos los comandos `near` con` npx`

Asegúrese de que esté instalado con `near --version` (o` npx near --version`)

## Paso 1: Crea una cuenta para el contrato

Cada cuenta en NEAR puede tener como máximo un contrato implementado. Si ya ha creado una cuenta como `your-name.testnet`, puede implementar su contrato en` near-project.your-name.testnet`. Suponiendo que ya ha creado una cuenta en [NEAR Wallet], aquí le mostramos cómo crear `near-project.your-name.testnet`:

1. Autorice NEAR CLI, siguiendo los comandos que le da:

   near login

2. Cree una subcuenta (reemplace "YOUR-NAME" a continuación con el nombre de su cuenta real):

   near create-account near-project.YOUR-NAME.testnet --masterAccount YOUR-NAME.testnet

## Paso 2: establece el nombre del contrato en el código

Modifique la línea en `src/config.js` que establece el nombre de cuenta del contrato. Configúrelo con la identificación de la cuenta que utilizó anteriormente.

const CONTRACT_NAME = process.env.CONTRACT_NAME || 'near-project.YOUR-NAME.testnet'

## Paso 3: ¡despliegue!

Un comando:

despliegue de hilo

Como puede ver en `package.json`, esto hace dos cosas:

1. construye e implementa contratos inteligentes en NEAR TestNet
2. construye e implementa código frontend en GitHub usando [gh-pages]. Esto solo funcionará si el proyecto ya tiene un repositorio configurado en GitHub. Siéntase libre de modificar el script `deploy` en` package.json` para implementarlo en otro lugar.
