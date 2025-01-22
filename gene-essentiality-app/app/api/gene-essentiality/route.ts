import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ensemblId = searchParams.get("ensemblId")

  const mockData = {
    essentialityData: [
      {
        tissueName: "breast",
        screens: [
          {
            cellLineName: "MCF7",
            geneEffect: -1.5,
            diseaseFromSource: "Breast Cancer",
            expression: 6.7,
            depmapId: "ACH-000001",
          },
          {
            cellLineName: "MDA-MB-231",
            geneEffect: 0.1,
            diseaseFromSource: "Triple-Negative Breast Cancer",
            expression: 1.8,
            depmapId: "ACH-000002",
          },
        ],
      },
      {
        tissueName: "subdivision of digestive tract",
        screens: [
          {
            cellLineName: "HT29",
            geneEffect: -0.8,
            diseaseFromSource: "Colorectal Cancer",
            expression: 4.2,
            depmapId: "ACH-000003",
          },
        ],
      },
      {
        tissueName: "lung",
        screens: [
          {
            cellLineName: "A549",
            geneEffect: -1.2,
            diseaseFromSource: "Lung Cancer",
            expression: 5.1,
            depmapId: "ACH-000004",
          },
        ],
      },
      {
        tissueName: "uterine cervix",
        screens: [
          {
            cellLineName: "HeLa",
            geneEffect: 0.3,
            diseaseFromSource: "Cervical Cancer",
            expression: 3.9,
            depmapId: "ACH-000005",
          },
        ],
      },
      {
        tissueName: "intestine",
        screens: [
          {
            cellLineName: "Caco-2",
            geneEffect: -0.9,
            diseaseFromSource: "Colorectal Cancer",
            expression: 4.8,
            depmapId: "ACH-000006",
          },
        ],
      },
      {
        tissueName: "kidney",
        screens: [
          {
            cellLineName: "786-O",
            geneEffect: -1.1,
            diseaseFromSource: "Renal Cancer",
            expression: 5.3,
            depmapId: "ACH-000007",
          },
        ],
      },
      {
        tissueName: "hematopoietic tissue",
        screens: [
          {
            cellLineName: "K562",
            geneEffect: 0.2,
            diseaseFromSource: "Leukemia",
            expression: 3.7,
            depmapId: "ACH-000008",
          },
        ],
      },
      {
        tissueName: "internal female genitalia",
        screens: [
          {
            cellLineName: "OVCAR-3",
            geneEffect: -1.3,
            diseaseFromSource: "Ovarian Cancer",
            expression: 5.6,
            depmapId: "ACH-000009",
          },
        ],
      },
      {
        tissueName: "external soft tissue zone",
        screens: [
          {
            cellLineName: "HT-1080",
            geneEffect: 0.4,
            diseaseFromSource: "Fibrosarcoma",
            expression: 3.2,
            depmapId: "ACH-000010",
          },
        ],
      },
      {
        tissueName: "testis",
        screens: [
          {
            cellLineName: "NTERA-2",
            geneEffect: -0.7,
            diseaseFromSource: "Testicular Cancer",
            expression: 4.1,
            depmapId: "ACH-000011",
          },
        ],
      },
      {
        tissueName: "renal system",
        screens: [
          {
            cellLineName: "ACHN",
            geneEffect: -1.4,
            diseaseFromSource: "Renal Cancer",
            expression: 5.8,
            depmapId: "ACH-000012",
          },
        ],
      },
      {
        tissueName: "Peripheral Nervous System",
        screens: [
          {
            cellLineName: "SH-SY5Y",
            geneEffect: 0.5,
            diseaseFromSource: "Neuroblastoma",
            expression: 3.4,
            depmapId: "ACH-000013",
          },
        ],
      },
      {
        tissueName: "craniocervical region",
        screens: [
          {
            cellLineName: "FaDu",
            geneEffect: -0.6,
            diseaseFromSource: "Head and Neck Cancer",
            expression: 4.3,
            depmapId: "ACH-000014",
          },
        ],
      },
      {
        tissueName: "thyroid gland",
        screens: [
          {
            cellLineName: "TPC-1",
            geneEffect: -1.0,
            diseaseFromSource: "Thyroid Cancer",
            expression: 5.0,
            depmapId: "ACH-000015",
          },
        ],
      },
      {
        tissueName: "skin of body",
        screens: [
          {
            cellLineName: "A375",
            geneEffect: 0.6,
            diseaseFromSource: "Melanoma",
            expression: 3.6,
            depmapId: "ACH-000016",
          },
        ],
      },
      {
        tissueName: "pancreas",
        screens: [
          {
            cellLineName: "PANC-1",
            geneEffect: -1.2,
            diseaseFromSource: "Pancreatic Cancer",
            expression: 5.4,
            depmapId: "ACH-000017",
          },
        ],
      },
      {
        tissueName: "mammalian vulva",
        screens: [
          {
            cellLineName: "A431",
            geneEffect: 0.3,
            diseaseFromSource: "Vulvar Cancer",
            expression: 3.8,
            depmapId: "ACH-000018",
          },
        ],
      },
      {
        tissueName: "lymphoid tissue",
        screens: [
          {
            cellLineName: "Raji",
            geneEffect: -0.8,
            diseaseFromSource: "Lymphoma",
            expression: 4.6,
            depmapId: "ACH-000019",
          },
        ],
      },
      {
        tissueName: "bone tissue",
        screens: [
          {
            cellLineName: "U2OS",
            geneEffect: 0.7,
            diseaseFromSource: "Osteosarcoma",
            expression: 3.5,
            depmapId: "ACH-000020",
          },
        ],
      },
      {
        tissueName: "hepatopancreatic ampulla",
        screens: [
          {
            cellLineName: "HuCCT1",
            geneEffect: -1.1,
            diseaseFromSource: "Cholangiocarcinoma",
            expression: 5.2,
            depmapId: "ACH-000021",
          },
        ],
      },
      {
        tissueName: "other",
        screens: [
          {
            cellLineName: "Various",
            geneEffect: 0.1,
            diseaseFromSource: "Mixed",
            expression: 4.0,
            depmapId: "ACH-000022",
          },
        ],
      },
      {
        tissueName: "liver",
        screens: [
          {
            cellLineName: "HepG2",
            geneEffect: -1.3,
            diseaseFromSource: "Hepatocellular Carcinoma",
            expression: 5.7,
            depmapId: "ACH-000023",
          },
        ],
      },
      {
        tissueName: "uterus",
        screens: [
          {
            cellLineName: "Ishikawa",
            geneEffect: 0.4,
            diseaseFromSource: "Endometrial Cancer",
            expression: 3.9,
            depmapId: "ACH-000024",
          },
        ],
      },
      {
        tissueName: "eye",
        screens: [
          {
            cellLineName: "ARPE-19",
            geneEffect: -0.5,
            diseaseFromSource: "Retinal Epithelium",
            expression: 4.2,
            depmapId: "ACH-000025",
          },
        ],
      },
      {
        tissueName: "prostate gland",
        screens: [
          {
            cellLineName: "PC-3",
            geneEffect: -1.4,
            diseaseFromSource: "Prostate Cancer",
            expression: 5.5,
            depmapId: "ACH-000026",
          },
        ],
      },
      {
        tissueName: "bile duct",
        screens: [
          {
            cellLineName: "TFK-1",
            geneEffect: 0.2,
            diseaseFromSource: "Cholangiocarcinoma",
            expression: 3.7,
            depmapId: "ACH-000027",
          },
        ],
      },
      {
        tissueName: "pleura",
        screens: [
          {
            cellLineName: "MSTO-211H",
            geneEffect: -0.9,
            diseaseFromSource: "Mesothelioma",
            expression: 4.4,
            depmapId: "ACH-000028",
          },
        ],
      },
    ],
  }

  return NextResponse.json(mockData)
}

