import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterFormData, Product, IndustryCategory } from '@/types';
import { Plus, X, ArrowRight, AlertCircle, Check } from 'lucide-react';
import MagneticInput from '@/components/MagneticInput';
import gsap from 'gsap';

const TECH_SUBCATEGORIES = ['SaaS', 'Cybersecurity', 'Cloud', 'Hardware'];
const MACHINERY_SUBCATEGORIES = ['Manufacturing', 'Automation', 'CNC', 'Heavy Equipment'];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    password: '',
    linkedInUrl: '',
    location: '',
    industry: 'tech',
    products: [{ title: '', description: '', category: '' }],
  });

  const [productFields, setProductFields] = useState<Product[]>([
    { title: '', description: '', category: '' },
  ]);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleIndustryChange = (industry: IndustryCategory) => {
    setFormData(prev => ({ ...prev, industry }));
    // Reset product categories
    setProductFields(prev =>
      prev.map(p => ({ ...p, category: '' }))
    );
  };

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    setProductFields(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addProductField = () => {
    const newField: Product = { title: '', description: '', category: '' };
    setProductFields(prev => [...prev, newField]);
    // Animate the new field
    setTimeout(() => {
      const fields = document.querySelectorAll('.product-field');
      const lastField = fields[fields.length - 1];
      if (lastField) {
        gsap.from(lastField, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }, 10);
  };

  const removeProductField = (index: number) => {
    if (productFields.length <= 1) return;
    setProductFields(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.fullName.trim()) return setError('Full name is required');
      if (!formData.jobTitle.trim()) return setError('Job title is required');
      if (!formData.companyName.trim()) return setError('Company name is required');
      if (!formData.email.trim()) return setError('Email is required');
      if (!formData.password.trim() || formData.password.length < 6) return setError('Password must be at least 6 characters');
    }
    if (step === 2) {
      if (!formData.location.trim()) return setError('Location is required');
      if (!formData.linkedInUrl.trim()) return setError('LinkedIn URL is required');
    }
    if (step === 3) {
      const validProducts = productFields.filter(
        p => p.title.trim() && p.description.trim() && p.category
      );
      if (validProducts.length === 0) {
        return setError('Add at least one complete product or service');
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() !== true) return;
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep() !== true) return;
    setIsSubmitting(true);

    const validProducts = productFields.filter(
      p => p.title.trim() && p.description.trim() && p.category
    );

    const success = register({
      ...formData,
      products: validProducts,
    });

    setTimeout(() => {
      if (success) {
        navigate('/directory');
      } else {
        setError('An account with this email already exists');
        setIsSubmitting(false);
      }
    }, 800);
  };

  const categories = formData.industry === 'tech' ? TECH_SUBCATEGORIES : MACHINERY_SUBCATEGORIES;

  const stepLabels = ['Personal Info', 'Profile Details', 'Product Catalog'];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[40%] relative items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/network-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#090A0F] via-[#090A0F]/90 to-transparent" />
        <div className="relative z-10 p-12 max-w-sm">
          <span className="font-mono-data text-xs tracking-[0.2em] text-[#4B4D55] uppercase">
            SALESCONNECT
          </span>
          <h2 className="text-3xl font-light text-[#F0F2F5] mt-6 mb-4 leading-tight">
            Join the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
              Network
            </span>
          </h2>
          <p className="text-sm text-[#8B8D98] leading-relaxed">
            Create your professional profile and connect with 2,800+ verified B2B sales professionals in tech and industrial machinery.
          </p>
          <div className="mt-8 space-y-3">
            {[
              'Verified professional network',
              'Direct encrypted messaging',
              'Product catalog showcase',
              'Real-time opportunity matching',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#8B8D98]">
                <Check className="h-4 w-4 text-[#10B981]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-lg pt-8">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {stepLabels.map((_label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      i + 1 === step
                        ? 'bg-[#2563EB] text-white'
                        : i + 1 < step
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#11121A] text-[#4B4D55] border border-white/[0.08]'
                    }`}
                  >
                    {i + 1 < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className={`w-8 h-[2px] transition-all ${
                        i + 1 < step ? 'bg-[#10B981]' : 'bg-white/[0.08]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-xl font-light text-[#F0F2F5] tracking-tight">
              {stepLabels[step - 1]}
            </h1>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <MagneticInput
                label="Full Name"
                placeholder="John Smith"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              <MagneticInput
                label="Job Title"
                placeholder="Senior Sales Director"
                value={formData.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
              />
              <MagneticInput
                label="Company Name"
                placeholder="Acme Corporation"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
              <MagneticInput
                label="Corporate Email"
                type="email"
                placeholder="john@acme.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <MagneticInput
                label="Password"
                type="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>
          )}

          {/* Step 2: Profile Details */}
          {step === 2 && (
            <div className="space-y-5">
              <MagneticInput
                label="Location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
              <MagneticInput
                label="LinkedIn Profile URL"
                type="url"
                placeholder="https://linkedin.com/in/johnsmith"
                value={formData.linkedInUrl}
                onChange={(e) => handleChange('linkedInUrl', e.target.value)}
              />

              <div>
                <label className="block font-mono-data text-xs text-[#4B4D55] uppercase tracking-wider mb-3">
                  Industry Background
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleIndustryChange('tech')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.industry === 'tech'
                        ? 'border-[#2563EB] bg-[#2563EB]/10'
                        : 'border-white/[0.08] bg-[#11121A] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#F0F2F5]">Tech Sales</div>
                    <div className="text-[11px] text-[#4B4D55] mt-1">SaaS, Cloud, Cybersecurity</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIndustryChange('machinery')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.industry === 'machinery'
                        ? 'border-[#F59E0B] bg-[#F59E0B]/10'
                        : 'border-white/[0.08] bg-[#11121A] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#F0F2F5]">Industrial Machinery</div>
                    <div className="text-[11px] text-[#4B4D55] mt-1">Manufacturing, Automation, CNC</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Product Catalog */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-[#8B8D98] mb-4">
                Add the products or services you offer. These will be displayed on your profile for other members to discover.
              </p>

              {productFields.map((product, index) => (
                <div
                  key={index}
                  className="product-field p-4 rounded-xl bg-[#11121A] border border-white/[0.08] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-[10px] text-[#4B4D55] uppercase tracking-wider">
                      Offering #{index + 1}
                    </span>
                    {productFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProductField(index)}
                        className="p-1 rounded text-[#4B4D55] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <MagneticInput
                    placeholder="Product/Service Title"
                    value={product.title}
                    onChange={(e) => handleProductChange(index, 'title', e.target.value)}
                  />

                  <MagneticInput
                    placeholder="Short Description"
                    value={product.description}
                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  />

                  <div>
                    <label className="block font-mono-data text-[10px] text-[#4B4D55] uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleProductChange(index, 'category', cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                            product.category === cat
                              ? formData.industry === 'tech'
                                ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]'
                                : 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]'
                              : 'border-white/[0.08] text-[#8B8D98] hover:border-white/[0.15]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addProductField}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.12] text-[#8B8D98] hover:text-[#F0F2F5] hover:border-white/[0.25] transition-all"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm">Add Another Offering</span>
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-sm text-[#8B8D98] hover:text-[#F0F2F5] transition-colors"
              >
                Back
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-[#8B8D98] hover:text-[#F0F2F5] transition-colors"
              >
                Sign In Instead
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1d4ed8] transition-colors"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1d4ed8] disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Initialize Profile
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
