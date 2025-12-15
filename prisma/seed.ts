// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@digfor.com' },
    update: {},
    create: {
      email: 'admin@digfor.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const investigator = await prisma.user.upsert({
    where: { email: 'investigator@digfor.com' },
    update: {},
    create: {
      email: 'investigator@digfor.com',
      name: 'John Investigator',
      password: userPassword,
      role: 'INVESTIGATOR',
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@digfor.com' },
    update: {},
    create: {
      email: 'analyst@digfor.com',
      name: 'Sarah Analyst',
      password: userPassword,
      role: 'ANALYST',
    },
  });

  console.log('✓ Users created');

  // Create sample cases
  const case1 = await prisma.case.upsert({
    where: { caseNumber: 'CASE-2024-001' },
    update: {},
    create: {
      caseNumber: 'CASE-2024-001',
      title: 'Corporate Data Breach Investigation',
      description: 'Investigation of unauthorized access to corporate database',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      incidentDate: new Date('2024-01-15'),
      assignedToId: investigator.id,
    },
  });

  const case2 = await prisma.case.upsert({
    where: { caseNumber: 'CASE-2024-002' },
    update: {},
    create: {
      caseNumber: 'CASE-2024-002',
      title: 'Employee Misconduct - Intellectual Property Theft',
      description: 'Analysis of employee workstation for evidence of IP theft',
      status: 'OPEN',
      priority: 'CRITICAL',
      incidentDate: new Date('2024-01-20'),
      assignedToId: analyst.id,
    },
  });

  console.log('✓ Cases created');

  // Create sample evidence
  const evidence1 = await prisma.evidence.create({
    data: {
      evidenceNumber: 'EV-2024-001',
      name: 'Server Hard Drive Image',
      description: 'Complete disk image of compromised web server',
      type: 'DISK_IMAGE',
      status: 'IN_ANALYSIS',
      hashSHA256: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
      fileSize: BigInt(500000000000),
      filePath: '/evidence/storage/ev-2024-001.dd',
      collectionDate: new Date('2024-01-16'),
      caseId: case1.id,
      collectedById: investigator.id,
    },
  });

  const evidence2 = await prisma.evidence.create({
    data: {
      evidenceNumber: 'EV-2024-002',
      name: 'Network Traffic Capture',
      description: 'PCAP file of suspicious network activity',
      type: 'NETWORK_CAPTURE',
      status: 'ANALYZED',
      hashMD5: '5d41402abc4b2a76b9719d911017c592',
      hashSHA1: 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
      fileSize: BigInt(25000000),
      filePath: '/evidence/storage/ev-2024-002.pcap',
      collectionDate: new Date('2024-01-16'),
      caseId: case1.id,
      collectedById: investigator.id,
    },
  });

  const evidence3 = await prisma.evidence.create({
    data: {
      evidenceNumber: 'EV-2024-003',
      name: 'Employee Laptop Image',
      description: 'Forensic image of suspect employee laptop',
      type: 'DISK_IMAGE',
      status: 'COLLECTED',
      hashSHA256: 'f1e2d3c4b5a697887766554433221100ffeeddccbbaa99887766554433221100',
      fileSize: BigInt(256000000000),
      filePath: '/evidence/storage/ev-2024-003.e01',
      collectionDate: new Date('2024-01-21'),
      caseId: case2.id,
      collectedById: analyst.id,
    },
  });

  console.log('✓ Evidence created');

  // Create chain of custody entries
  await prisma.chainOfCustody.createMany({
    data: [
      {
        action: 'COLLECTED',
        location: 'Server Room A',
        notes: 'Initial collection of server hard drive',
        evidenceId: evidence1.id,
        handlerId: investigator.id,
      },
      {
        action: 'TRANSFERRED',
        location: 'Forensics Lab',
        notes: 'Transferred to forensics lab for analysis',
        evidenceId: evidence1.id,
        handlerId: analyst.id,
        timestamp: new Date('2024-01-17'),
      },
    ],
  });

  console.log('✓ Chain of custody created');

  // Create analysis results
  await prisma.analysisResult.create({
    data: {
      title: 'File System Timeline Analysis',
      analysisType: 'FILE_SYSTEM',
      findings: 'Identified unauthorized file access patterns between 02:00-04:00 on January 15th. Multiple database files were copied to external media.',
      toolsUsed: ['Autopsy', 'Sleuth Kit', 'log2timeline'],
      artifacts: {
        suspiciousFiles: [
          '/var/lib/mysql/customers.sql',
          '/var/lib/mysql/transactions.sql',
        ],
        timestamps: ['2024-01-15T02:15:00Z', '2024-01-15T02:45:00Z'],
      },
      evidenceId: evidence1.id,
    },
  });

  console.log('✓ Analysis results created');

  // Create sample report
  await prisma.report.create({
    data: {
      title: 'Preliminary Investigation Report - Data Breach',
      reportType: 'PRELIMINARY',
      content: 'This preliminary report outlines initial findings from the corporate data breach investigation...',
      summary: 'Evidence indicates unauthorized access occurred between 02:00-04:00 on January 15th, 2024.',
      findings: {
        keyFindings: [
          'Unauthorized database access detected',
          'Data exfiltration confirmed',
          'External USB device used',
        ],
      },
      recommendations: 'Recommend immediate password reset for all database accounts and implementation of enhanced monitoring.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      caseId: case1.id,
      authorId: investigator.id,
    },
  });

  console.log('✓ Reports created');

  // Create activity logs
  await prisma.activity.createMany({
    data: [
      {
        action: 'CASE_CREATED',
        entity: 'Case',
        entityId: case1.id,
        details: { caseNumber: case1.caseNumber },
        userId: investigator.id,
        caseId: case1.id,
      },
      {
        action: 'EVIDENCE_CREATED',
        entity: 'Evidence',
        entityId: evidence1.id,
        details: { evidenceNumber: evidence1.evidenceNumber },
        userId: investigator.id,
        caseId: case1.id,
      },
    ],
  });

  console.log('✓ Activity logs created');

  console.log('
✅ Database seeding completed successfully!');
  console.log('
Default credentials:');
  console.log('Admin: admin@digfor.com / admin123');
  console.log('Investigator: investigator@digfor.com / user123');
  console.log('Analyst: analyst@digfor.com / user123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });