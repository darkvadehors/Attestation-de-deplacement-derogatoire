//     info: {
//         title: 'COVID-19 - Déclaration de déplacement',
//         author: `Ministère de l'injustice`,
//         subject: 'Attestation de déplacement dérogatoire',
//         keywords: [ 'covid19', 'covid-19', 'attestation', 'déclaration', 'déplacement', 'officielle', 'gouvernement', ],
//       },
//       content: [
//         {
//           text: 'ATTESTATION DE DÉPLACEMENT DÉROGATOIRE DURANT LES HORAIRES DU COUVRE-FEU ',
//               margin: [ 40, 8.5, 40, 10 ],
//           style: 'header',
//         },
//         {
//           text: 'En application du décret no 2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire',
//           fontSize: 9,
//           alignment: 'left',
//             margin: [ 30, 0, 60, 22 ]
//         },
//         {
//           text: [
//             'Mme/M. :  ',
//                 { text: this._varGlobal.setting.firstname, fontSize: 11 },
//             ' ',
//                 { text: this._varGlobal.setting.lastname, fontSize: 11 },

//           ],
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 0, 20, 5 ]
//         },
//         {
//           text: [
//             'Né(e) le : ',
//                 { text: this.dateofbirth, fontSize: 11, },
//                 { text: '                                             à : ' },
//                 { text: this._varGlobal.setting.cityofbird, fontSize: 11 },
//           ],
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 0, 20, 5 ]
//         },
//         {
//           text: [
//             'Demeurant  : ',
//                 { text: this._varGlobal.setting.adress, fontSize: 11 },
//             ' ',
//                 { text: this._varGlobal.setting.zipcode, fontSize: 11 },
//             ' ',
//                 { text: this._varGlobal.setting.city, fontSize: 11 }
//           ],
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 0, 20, 5 ]
//         },
//         {
//           text: `certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé en application des mesures générales nécessaires pour faire face à l’épidémie de COVID-19 dans le cadre de l’état d’urgence sanitaire :`,
//           fontSize: 10.6,
//           alignment: 'justify',
//             margin: [ 30, 20, 20, 20 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou le lieu  d’enseignement et de formation, déplacements professionnels ne pouvant être différés'
//             }
//           ],
//             margin: [ 30, 0, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements pour des consultations, examens, actes de prévention (dont vaccination) et soins ne pouvant être assurés à distance et ne pouvant être différés ou pour l’achat de produits de santé'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou précaires ou pour la garde d’enfants'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements des personnes en situation de handicap et de leur accompagnant'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements pour répondre à une convocation judiciaire ou administrative'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements pour participer à des missions d’intérêt général sur demande de l’autorité administrative'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements liés à des transits ferroviaires, aériens ou en bus pour des déplacements de longues distances'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           columns: [
//             {
//               width: 30,
//               text: [
//                   { text: '[  ]', fontSize: 12 }
//               ]
//             },
//             {
//               width: '*',
//               text: 'Déplacements brefs, dans un rayon maximal d’un kilomètre autour du domicile pour les besoins des animaux de compagnie'
//             }
//           ],
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           text: [
//             'Fait à :  ',
//                 { text: this._varGlobal.setting.city, fontSize: 11 },
//           ],
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 10, 20, 0 ]
//         },
//         {
//           text: [
//             'le : ',
//                 { text: this.toDayFr, fontSize: 11, },
//                 { text: '                                                        à : ' },
//                 { text: this.timebackColon, fontSize: 11 },
//           ],
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 5, 20, 0 ]
//         },
//         {
//           text: '(Date et heure de début de sortie à mentionner obligatoirement)',
//           fontSize: 10.6,
//           alignment: 'left',
//             margin: [ 30, 5, 0, 10 ]
//         },
//         {
//           qr: qrcode, alignment: 'left',
//             margin: [ 390, 0, 0, 0 ], fit: '114'
//         },
//         {
//           columns: [
//             {
//               width: 15,
//               text: [
//                   { text: '1', fontSize: 5 }
//               ]
//             },
//             {
//               width: '*',
//               text: `Les personnes souhaitant bénéficier de l’une de ces exceptions doivent se munir s’il y a lieu, lors de leurs déplacements hors de leur domicile, d’un document leur permettant de justifier que le déplacement considéré entre dans le champ de l’une de ces exceptions.`,
//               fontSize: 8.5,
//               alignment: 'justify',
//             }
//           ],
//             margin: [ 50, 15, 32, 0 ]
//         },

//         // colored QR
//         {
//           qr: qrcode, alignment: 'left',
//             margin: [ 16, 12, 0, 0 ], fit: '305', version: 10, eccLevel: 'M',
//           pageBreak: 'before'
//         },
//       ],
//       styles: {
//         header: {
//           fontSize: 17,
//           alignment: 'center',
//         },
//         subheader: {
//           fontSize: 15,
//           bold: true
//         },
//         quote: {
//           italics: true
//         },
//         small: {
//           fontSize: 8.5
//         }
//       }