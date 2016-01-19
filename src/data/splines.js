const splines = [
  [
    [-279.0411694362883, -0.00888310661206404, 612.8773444149264],
    [-174.0917913887689, 24.048196171866206, 620.8003407090355],
    [-83.64176202589198, 40.64507534913295, 637.1665499336823],
    [18.71857280463575, 64.7077546700894, 648.0783050421609],
    [91.59422714335501, 66.11757644138208, 646.9050913050128],
    [220.12171904222697, 24.177508393449372, 656.8677129230208]
  ],
  [
    [-297.22725637549917, 6.409757857564859, 587.2726358043556],
    [-200.40866839657124, 34.46529125814465, 576.9466239302894],
    [-100.79873980431123, 60.01587243789969, 572.9476578655048],
    [12.515288762659843, 94.03236073766519, 564.8582246858883],
    [106.90658222732752, 96.74235255161761, 562.3966616390633],
    [281.4843592286484, 62.8614508768548, 577.2459346737796]
  ],
  [
    [-315.4057184830279, 9.250140820426498, 561.6628148290699],
    [-223.55668568703132, 39.09491274302232, 553.4643160016387],
    [-108.43298763605591, 75.87159340118009, 546.8678916213436],
    [12.515288762659843, 108.22141493752429, 546.9566407028242],
    [106.90658222732752, 121.32895623928736, 537.281737512368],
    [288.6484756863637, 103.45777106524116, 539.3410414496395]
  ],
  [
    [-332.7868580579622, 20.637823672615315, 537.5301821671636],
    [-223.55668568703132, 52.58376880331153, 526.8988719829224],
    [-108.43298763605591, 93.32961062587198, 518.8961663436984],
    [12.515288762659843, 137.29044865351244, 513.7687053537919],
    [130.54503176710983, 148.1617801749302, 507.0314450807938],
    [310.3519921375465, 135.37468043953567, 507.44712946370146]
  ],
  [
    [-353.8076133962761, 27.00776656445709, 508.484353512089],
    [-223.55668568703132, 69.96699766531712, 503.2150136754459],
    [-108.43298763605591, 114.42254372240818, 491.38539888381194],
    [12.515288762659843, 159.89497429654563, 486.999159230465],
    [130.54503176710983, 185.92419731640513, 479.6761153221905],
    [310.3519921375465, 192.8901258122745, 483.9546184420626]
  ],
  [
    [-371.17002465019164, 41.69907878530009, 484.7243427811919],
    [-223.55668568703132, 88.42554599834654, 472.4835809318566],
    [-137.76924882905834, 124.14650167990567, 461.0386660617737],
    [12.515288762659843, 181.13921442158946, 477.5749838662375],
    [130.54503176710983, 215.24344636116788, 447.88591364900526],
    [310.3519921375465, 238.00554960585146, 446.30047374104066]
  ],
  [
    [-390.86763305476677, 59.2862309629558, 457.177109467217],
    [-287.0477762399621, 85.53958317745274, 443.28606434307443],
    [-195.7832847667493, 120.52060715592452, 440.4418669754034],
    [-49.008630994107016, 187.15318132129354, 424.7983628102924],
    [39.91432386585686, 219.53432343868243, 419.39933835045287],
    [137.0962968744113, 242.49429806995659, 411.06299414584646]
  ],
  [
    [-408.50745926390977, 74.72105331313229, 432.8687561025303],
    [-287.0477762399621, 105.70905242653258, 423.5888608679032],
    [-195.7832847667493, 143.2620790069608, 415.0770700772119],
    [-49.008630994107016, 207.9032510843065, 408.4270699726297],
    [58.488745769573484, 244.2832923979207, 403.2263840659878]
  ],
  [
    [-431.00624454062284, 94.11652192028838, 401.3648315758647],
    [-287.0477762399621, 123.61852781073823, 399.16341987007576],
    [-195.7832847667493, 163.7165618851338, 392.9611586070345],
    [-49.008630994107016, 227.85205066403424, 384.2866652033714],
    [58.488745769573484, 268.389648607482, 379.9712729126059]
  ],
  [
    [-442.1477575754589, 111.62459824388777, 385.93117056023294],
    [-327.8185505490404, 127.61564005213111, 383.14818326786855],
    [-206.26673783709182, 183.07060605558297, 377.75270861274953],
    [-48.19043130674481, 252.39816230224054, 368.6596672590383],
    [2.3161775675008798, 273.21452151214714, 362.592552460032]
  ],
  [
    [-457.8102743590825, 127.28717170412249, 363.9212119321632],
    [-361.60901471383306, 139.97801248487266, 364.06498044649913],
    [-272.5533686273335, 179.6713033039049, 344.25730847711776],
    [-145.6581942297252, 257.7633694048467, 310.0202904716799],
    [-68.93744417994277, 308.4747045882857, 276.5722820069183],
    [-43.39237153359734, 346.27193766786087, 235.43942972508972]
  ],
  [
    [-468.770438723442, 139.09037607719506, 349.46007863571083],
    [-385.38825379806974, 151.01835268157228, 344.6994165905501],
    [-281.26591554623377, 197.96765167400275, 327.72401094330877],
    [-197.93303961216697, 260.51472057928834, 292.34792325998427],
    [-147.1272500305331, 308.4747045882857, 255.15326687138366],
    [-113.91530197810509, 346.27193766786087, 222.61870062743498]
  ],
  [
    [-481.8067429525263, 159.07939476916994, 329.3966138072974],
    [-385.38825379806974, 169.3439584431475, 326.6504161273585],
    [-281.26591554623377, 218.50771585713315, 310.9105158737591],
    [-197.93303961216697, 293.49058491875553, 273.00730710164385],
    [-141.76261117485225, 334.4047929551662, 260.0042122596788],
    [-113.91530197810509, 362.65275784532525, 235.74586682294847]
  ],
  [
    [-500.72355306728684, 177.99620443909504, 304.92753458819544],
    [-385.38825379806974, 193.66060602457256, 305.0680236450889],
    [-281.26591554623377, 250.7964372171177, 288.15625912960115],
    [-197.93303961216697, 331.8599045528115, 259.8403959092836],
    [-141.76261117485225, 369.79817463237686, 241.38450029962434],
    [-113.91530197810509, 395.3811782258533, 220.58263524391612]
  ],
  [
    [-514.5976884022002, 199.269913567318, 286.2974215101505],
    [-402.1300310642472, 219.70325709909923, 282.32115788548754],
    [-300.3872088828896, 282.3464337552759, 262.2861067532268],
    [-235.28711912257535, 340.9480341453285, 241.49934367618673],
    [-243.99572362857776, 393.75021762889185, 181.30322655607858],
    [-342.2534064609765, 455.9973297340939, 71.49433908405408],
    [-800.1899290703211, 486.6621593319623, -110.91916060484755]
  ],
  [
    [-526.9196271117396, 219.17473279019467, 268.6242805051559],
    [-423.2939661701263, 244.71518896795885, 257.70686799769237],
    [-356.2159290869406, 289.32500115271887, 230.7432005648585],
    [-334.19178327709847, 335.7390660650971, 189.63808444553285],
    [-288.04805412581237, 390.62651615762223, 154.16851648509117],
    [-269.45733604525054, 437.1887112840871, 113.88912298968552],
    [-490.88763945169825, 542.5654930412971, -68.67487609570074],
    [-845.5517338492963, 549.3696894156845, -172.98610393749107]
  ],
  [
    [-536.571961463437, 238.47936341978183, 255.20980374577823],
    [-478.6644204826908, 254.60276493867616, 237.0573305470984],
    [-433.8411132336616, 277.0684122248154, 211.88242082735783],
    [-395.11706514538355, 326.1192765975301, 175.2456654092653],
    [-339.4123825280865, 390.62651615762223, 138.40048573122937],
    [-297.5336026254425, 460.97845615159315, 97.32855323911895],
    [-567.4981938022754, 548.6175282264676, -102.69533816985034],
    [-822.0368425682536, 503.7858125154609, -144.04926749567184]
  ],
  [
    [-538.6965982307604, 258.2108262977402, 253.46278234789878],
    [-484.6843801688818, 271.18152686586967, 239.3298845329038],
    [-437.9638274904868, 296.3641389207451, 220.64338170166084],
    [-394.2357609364069, 332.44506594305534, 201.12272825650157],
    [-376.8407855992561, 381.98544816952875, 147.87103008966616],
    [-322.24586928051554, 449.155637638628, 116.0664478894076],
    [-485.36332785387293, 567.4763175639285, -102.02509961239281]
  ],
  [
    [-548.371652098052, 285.3007484468412, 236.9861870543496],
    [-484.6843801688818, 300.75590962636073, 225.81365469900027],
    [-434.0944658075031, 341.2851501624358, 198.81573064807958],
    [-394.2357609364069, 381.8773783919634, 174.11117313497368],
    [-376.8407855992561, 433.7258875248572, 124.83632639610295],
    [-356.6126119190867, 482.5801309556761, 99.65311530515906],
    [-574.9898457971263, 515.2556215695711, 27.11599320197186],
    [-642.7011558144746, 488.20315313557217, 110.47978678673783]
  ],
  [
    [-594.1751340905943, 339.2948421159996, 176.76526842604238],
    [-531.60840549165, 318.1056228369433, 195.39106864140413],
    [-475.1059613887905, 349.42425051819873, 181.15763565702864],
    [-405.2264370973613, 425.8652447437968, 151.94546018152974],
    [-491.22532966578774, 450.8496090404656, 99.37619792920432],
    [-666.9961829585172, 477.7867156533941, 74.45759900489092]
  ],
  [
    [-631.6899617367751, 387.04084925843983, 122.81609344235713],
    [-552.2275513030681, 349.57690273377426, 162.62830389814135],
    [-515.8470059376295, 368.143072790819, 150.36690851030747],
    [-516.5105182005501, 420.06915658332275, 105.535447728594],
    [-649.4675844056023, 465.68484864063606, 46.07472920616543],
    [-631.6899617367751, 401.565448647196, 122.81609344235713]
  ],
  [
    [-611.2273105856825, 394.99858459875645, 122.81609344235713],
    [-558.8769038648234, 370.6332089465618, 144.87437014654043],
    [-524.513947679535, 386.9464811370383, 136.9169707278347],
    [-557.9962310171546, 434.29286370860484, 85.39633088132967],
    [-655.8099055227744, 466.9946863038503, 21.231317910342412],
    [-611.2273263504487, 400.42860637878044, 122.81609344235713]
  ]

]

export default splines