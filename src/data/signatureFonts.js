export const signatureFonts = [
  {id:'arial',label:'Arial · clean',family:'Arial,Helvetica,sans-serif'},
  {id:'verdana',label:'Verdana · spacious',family:'Verdana,Geneva,sans-serif'},
  {id:'tahoma',label:'Tahoma · compact',family:'Tahoma,Verdana,sans-serif'},
  {id:'trebuchet',label:'Trebuchet MS · friendly',family:'Trebuchet MS,Arial,sans-serif'},
  {id:'georgia',label:'Georgia · classic',family:'Georgia,Times New Roman,serif'},
  {id:'times',label:'Times New Roman · traditional',family:'Times New Roman,Times,serif'},
];
export const signatureFont = id => signatureFonts.find(font=>font.id===id)?.family || signatureFonts[0].family;
