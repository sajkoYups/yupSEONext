# yupSEO Next.js Tool

A modern, performant SEO analysis tool built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Comprehensive SEO Analysis**: Analyze title tags, meta descriptions, headings, page load speed, and more
- **Keyword Analysis**: Track keyword usage across titles, headings, and body content
- **Performance Metrics**: Monitor page load times and HTTP/2 support
- **Link Analysis**: Check internal links, section links, and broken links
- **Social Media Integration**: Analyze social media presence
- **Local SEO**: Google Business Profile analysis
- **🔗 Shareable Links**: Create time-limited shareable URLs for audit results (NEW!)
- **PDF Export**: Generate detailed SEO reports
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety for better development experience

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **PDF Generation**: jsPDF and html2canvas

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd yupseonext
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the project root:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > .env.local
```

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Website URL**: Input the website you want to analyze
2. **Add Company Name**: Optional company name for the report
3. **Set Crawl Depth**: Choose how many pages to analyze (1-5)
4. **Add Keywords**: Enter target keywords for analysis
5. **Add Location**: Optional location for local SEO analysis
6. **Click Analyze**: The tool will crawl the website and generate a comprehensive SEO report
7. **Share Results**: Create a shareable link to send results to clients or team members
8. **Export PDF**: Download a detailed PDF report

### 🔗 Shareable Links Feature

After completing an SEO audit, you can create shareable links:

- Click "Share Results" button
- Choose expiration period (7, 14, 30, or 90 days)
- Copy the generated link
- Share with anyone - no login required!
- Track view counts

Shared links display at `/shared/[shareId]` with all audit results and metadata.

For more details, see [SHARE_FEATURE.md](./SHARE_FEATURE.md)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Main application page
│   └── shared/         # Shared results viewer
│       └── [shareId]/  # Dynamic route for shared links
├── components/         # React components
│   ├── sections/       # Analysis section components
│   └── ui/            # Reusable UI components
│       ├── ShareModal.tsx      # Share link modal
│       └── ...
├── lib/               # Utilities and configurations
│   ├── api/           # API integration
│   │   └── share.ts   # Share link API functions
│   ├── config.ts      # API configuration
│   ├── constants.ts   # SEO descriptions and constants
│   └── helpers.ts     # Grading and utility functions
```

## API Integration

This tool integrates with the yupSEO Node.js backend API.

**Backend Endpoints Used:**
- `POST /crawl` - Analyze website SEO
- `POST /share-link` - Create shareable link
- `GET /share-link/:shareId` - Fetch shared results
- `POST /pdf/export` - Generate PDF report

**Local Development:** `http://localhost:5001`  
**Production:** `https://yupseonode.onrender.com`

Make sure your backend server is running for local development.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for code formatting

## Deployment

The application can be deployed to Vercel, Netlify, Render, or any other Next.js-compatible hosting platform.

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://yupseonode.onrender.com`
4. Deploy!

The app will automatically use the correct backend URL based on the environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
