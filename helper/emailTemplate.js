export const factureManquante = (headers, data,generateStyles) => {
    
    const html = ` 
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    
      <div style="background-color: #f5f5f5; padding: 20px;">
        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e6e6e6;">
          <tr>
          <td>
          <div  style="position: relative; overflow: hidden; color: white; z-index: 1; background: linear-gradient(90deg, rgba(66,38,112,1) 0%, rgba(124,158,52,0.6699054621848739) 87%, rgba(138,186,38,1) 100%);">
              <div  style="display: flex;">
                <div style="width: 30%; text-align: center;">
                <img src="https://res.cloudinary.com/ddktdjqz4/image/upload/v1685744357/logoMedi_hetv2l.png" alt="Icon"  style="vertical-align: middle; width: 200px; height: auto; padding: 5px; border-radius: 16px;" />

                </div>
                <div style="width: 70%; text-align: center;">
                  <div class="address-detail">
                    <div>
                      <h4 class="mb-2">
                      Adresse: Résidence la colombe Place AL HAMAMA,
                      </h4>
                      <h4 class="mb-2"> Avenue Hassan II Tétouan</h4>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
           
            <div style="text-align: center;">
            <h2 style="display: inline-block; margin-bottom: 16px;">Facture manquante</h2>
          </div>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                <tr style="background-color: #b550ab;color: white;font-size: medium;">
                ${headers
                  .map(
                    (header) =>
                      `<th style="${generateStyles(header.styles)}">${
                        header.label
                      }</th>`
                  )
                  .join("")}
                  </tr>
                </thead>
                <tbody>
                ${data
                  .map((item) => {
                    return `
                      <tr>
                        ${Object.keys(item)
                          .map((key) => {
                            const header = headers.find((h) => h.key === key);
                            if (header) {
                              const { styles } = header;
                              const value = item[key] || "";

                                return `<td style="${generateStyles(
                                  styles
                                )}">${value}</td>`;
                              
                            }
                          })
                          .join("")}
                      </tr>
                    `;
                  })
                  .join("")}
                </tbody>
              </table>
             
            </td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 20px; width: 100%; border: 1px solid #e6e6e6;">
                <div>
                  <h4>Tél: 0539960096 - Fax: 0539701873 - Email: medicolgrossiste@gmail.com</h4>
                  <h4>RC: 13281 - Patente: 51170574 - IF: 14364693 - CNSS: 9420150</h4>
                
                  </div>
                </div>
      </div>
    
    </body>`;
    return html;
};