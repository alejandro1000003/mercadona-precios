import { firefox } from 'playwright';

async function obtenerPrecio() {
    console.log("Cargando páginas...") // mensaje opcional decorativo

    // Iniciar Firefox y configurar navegador ⬇️
    
    // Lanzar Firefox con interfaz gráfica
    const browser = await firefox.launch({ headless: true });

    // Crear una nueva página
    const page = await browser.newPage();

    // Navegar a la URL para establecer el contexto de la página
    await page.goto('https://tienda.mercadona.es');

    // Establecer las cookies (obtenidas de forma manual con burpsuite)
    await page.context().addCookies([
        { name: '__mo_ui', value: '{"language":"es"}', domain: 'tienda.mercadona.es', path: '/' },
        { name: 'amplitude_id_79df67fe141fc3f96c86626c407a01c1tienda.mercadona.es', value: 'eyJkZXZpY2VJZCI6IjM3YjhiZWRhLTU5MGMtNDg4Ni1iMGYzLWY3Yzc3ZDM3YmU1NlIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTcyMzgzMjczMTU0OCwibGFzdEV2ZW50VGltZSI6MTcyMzgzMjk2Mzg4NiwiZXZlbnRJZCI6MzksImlkZW50aWZ5SWQiOjYsInNlcXVlbmNlTnVtYmVyIjo0NX0=', domain: 'tienda.mercadona.es', path: '/' },
        { name: '__mo_ca', value: '{"thirdParty":true,"necessary":true,"version":1}', domain: 'tienda.mercadona.es', path: '/' },
        { name: '__mo_da', value: '{"warehouse":"bcn1","postalCode":"08002"}', domain: 'tienda.mercadona.es', path: '/' }
    ]);

    // Navegar a la URL del producto ⬇️

    // Array de enlaces de productos
    const enlaces = [
        'https://tienda.mercadona.es/product/12348/cacahuetes-hacendado-chocolate-negro-paquete',
        'https://tienda.mercadona.es/product/12020/cacahuetes-chocoiris-hacendado-banados-chocolate-con-leche-coloreados-paquete'
        // ...
    ];

    // Itera sobre cada enlace
    for (const enlace of enlaces) {
        // Navega a la URL del producto
        await page.goto(enlace);
        
        // Espera a que los selectores estén presentes
        await page.waitForSelector('.title2-b.private-product-detail__description');
        await page.waitForSelector('.product-price__unit-price.large-b');
        
        // Obtiene el texto del elemento
        const nombre = await page.textContent('.title2-b.private-product-detail__description');
        const precio = await page.textContent('.product-price__unit-price.large-b');

        // Imprime el texto en la consola
        console.log(`\nNombre: ${nombre}\nPrecio: ${precio}`);
    }

    // Cerrar el navegador
    await browser.close();

}

obtenerPrecio().catch(console.error);
