import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';
import studentIcon from '../assets/images/student-male.png';
import teachingIcon from '../assets/images/teaching.png';
import { apiService } from '../utils/api';

export default function AssignFlash() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [assignMode, setAssignMode] = useState('individual'); // 'individual' | 'class'
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [flashData, setFlashData] = useState(null);

  // Load flash data from sessionStorage
  useEffect(() => {
    try {
      const storedData = window.sessionStorage.getItem('flashGeneratorPlan');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFlashData(parsedData);
        console.log('Loaded flash data:', parsedData);
      }
    } catch (error) {
      console.error('Error loading flash data:', error);
    }
  }, []);

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoadingStudents(true);
        const response = await apiService.get('/students/');
        const studentsData = response.data?.students || [];
        setStudents(studentsData);
        if (studentsData.length > 0) {
          setSelectedStudent(studentsData[0].username);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
      } finally {
        setIsLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  // Fetch sections data
  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoadingSections(true);
        const response = await apiService.get('/sections/');
        const sectionsData = response.data?.sections || [];
        setSections(sectionsData);
        if (sectionsData.length > 0) {
          setSelectedSection(sectionsData[0].name);
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
        toast.error('Failed to load sections');
      } finally {
        setIsLoadingSections(false);
      }
    };

    fetchSections();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!flashData || !flashData.items || flashData.items.length === 0) {
        toast.error(
          'No flash activities to assign. Please go back and add some activities.'
        );
        return;
      }

      // Get the selected student or section ID
      let studentId = null;
      let sectionId = null;

      if (assignMode === 'individual') {
        const selectedStudentData = students.find(
          s => s.username === selectedStudent
        );
        studentId = selectedStudentData?.id || null;
      } else {
        const selectedSectionData = sections.find(
          s => s.name === selectedSection
        );
        sectionId = selectedSectionData?.id || null;
      }

      // Make API calls for each flash activity
      const apiCalls = flashData.items.map(async item => {
        const requestData = {
          concept: item.concept,
          length_of_question: item.length?.toString() || '6',
          number_of_questions: item.questions,
          student_id: studentId,
          teacher_id: null, // You can add teacher_id logic here if needed
          section_id: sectionId,
          speed: item.time,
          activity_name: title || 'Untitled Activity',
        };

        console.log('Making API call with data:', requestData);
        try {
          return await apiService.post('/questions/', requestData);
        } catch (error) {
          console.error(`Failed to assign item: ${item.concept}`, error);
          // Return null for failed items instead of throwing
          return null;
        }
      });

      // Wait for all API calls to complete
      const responses = await Promise.all(apiCalls);
      console.log('All API responses:', responses);

      // Check if any API calls succeeded
      const successfulResponses = responses.filter(
        response => response !== null
      );
      if (successfulResponses.length === 0) {
        toast.error(
          'No flash activities could be assigned. Please check your selections and try again.'
        );
        return;
      }

      // Show warning if some failed
      if (successfulResponses.length < responses.length) {
        const failedCount = responses.length - successfulResponses.length;
        toast.warning(
          `${successfulResponses.length} activities assigned successfully, ${failedCount} failed.`
        );
      }

      // Store the assignment data for reference
      const payload = {
        flashData,
        title: title || 'Untitled Activity',
        assignMode,
        selectedStudent: assignMode === 'individual' ? selectedStudent : null,
        selectedSection: assignMode === 'class' ? selectedSection : null,
        studentId,
        sectionId,
        apiResponses: responses,
        createdAt: Date.now(),
      };

      window.sessionStorage.setItem('flashAssignment', JSON.stringify(payload));

      // Only show success message if all activities were assigned successfully
      if (successfulResponses.length === responses.length) {
        toast.success('Flash activities assigned successfully!');
      }

      // Navigate to confirmation screen
      navigate('/notification-sent');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to assign flash activities. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-200/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[88vh] p-6 md:p-10 flex flex-col relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 md:w-24" />
            <h1
              className="text-2xl md:text-4xl font-extrabold tracking-wide text-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              FLASH NUMBER GENERATOR
            </h1>
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={logoutIcon}
                alt="Logout"
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <span className="text-xs md:text-sm mt-1">Logout</span>
            </button>
          </div>

          {/* Title input */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-base md:text-lg font-semibold">
              Title of Activity:
            </div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Your title here"
              className="w-[220px] md:w-[360px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base"
            />
          </div>

          {/* Assign panels */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] items-start gap-6 md:gap-10">
            {/* Individual */}
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold mb-2">
                Assign task to individual
              </div>
              <button
                onClick={() => setAssignMode('individual')}
                className={`p-3 rounded-2xl border-2 ${
                  assignMode === 'individual'
                    ? 'border-blue-600'
                    : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={studentIcon}
                  alt="Student"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-4">
                <select
                  value={selectedStudent}
                  onChange={e => setSelectedStudent(e.target.value)}
                  disabled={isLoadingStudents}
                  className="w-[220px] md:w-[300px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base font-semibold disabled:opacity-50"
                >
                  {isLoadingStudents ? (
                    <option value="">Loading students...</option>
                  ) : students.length > 0 ? (
                    students.map(student => (
                      <option
                        key={student.id || student.username}
                        value={student.username}
                      >
                        {student.username}
                      </option>
                    ))
                  ) : (
                    <option value="">No students available</option>
                  )}
                </select>
              </div>
            </div>

            {/* OR */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold">OR</div>
            </div>

            {/* Class */}
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold mb-2">
                Assign task to class
              </div>
              <button
                onClick={() => setAssignMode('class')}
                className={`p-3 rounded-2xl border-2 ${
                  assignMode === 'class'
                    ? 'border-blue-600'
                    : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={teachingIcon}
                  alt="Class"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-4">
                <select
                  value={selectedSection}
                  onChange={e => setSelectedSection(e.target.value)}
                  disabled={isLoadingSections}
                  className="w-[220px] md:w-[300px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base font-semibold disabled:opacity-50"
                >
                  {isLoadingSections ? (
                    <option value="">Loading sections...</option>
                  ) : sections.length > 0 ? (
                    sections.map(section => (
                      <option
                        key={section.id || section.name}
                        value={section.name}
                      >
                        {section.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No sections available</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="absolute left-4 md:left-8 bottom-4 flex items-center gap-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={universityIcon}
                alt="Dashboard"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                DASHBOARD
              </span>
            </button>
          </div>

          <div className="absolute right-4 md:right-8 bottom-4">
            <button
              onClick={handleSubmit}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={studentIcon}
                alt="Submit"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                SUBMIT
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
