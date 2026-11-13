package com.jobPortal.profile_service.service;

import com.jobPortal.profile_service.dto.ProfileRequestDto;
import com.jobPortal.profile_service.dto.ProfileResponseDto;
import com.jobPortal.profile_service.entity.Profile;
import com.jobPortal.profile_service.repository.ProfileRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository ;
    public ProfileService(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }

    // 1. Create Profile
    public ProfileResponseDto createProfile(Long userId, ProfileRequestDto request) {

        if (profileRepository.existsByUserId(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Profile already exists for this user"
            );
        }

        Profile profile = new Profile();

        profile.setUserId(userId);
        profile.setFullName(request.getFullName());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setBio(request.getBio());
        profile.setSkills(request.getSkills());
        profile.setExperienceYears(
                request.getExperienceYears() == null ? 0 : request.getExperienceYears()
        );
        profile.setResumeUrl(request.getResumeUrl());

        Profile savedProfile = profileRepository.save(profile);

        return mapToResponse(savedProfile);
    }

    // 2. Get Profile
    @Transactional(readOnly = true)
    public ProfileResponseDto getProfile(Long userId) {

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Profile not found"
                ));

        return mapToResponse(profile);
    }

    // 3. Update Profile
    public ProfileResponseDto updateProfile(
            Long userId,
            ProfileRequestDto request
    ) {

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Profile not found"
                ));

        profile.setFullName(request.getFullName());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setBio(request.getBio());
        profile.setSkills(request.getSkills());
        profile.setExperienceYears(
                request.getExperienceYears() == null ? 0 : request.getExperienceYears()
        );
        profile.setResumeUrl(request.getResumeUrl());

        Profile updatedProfile = profileRepository.save(profile);

        return mapToResponse(updatedProfile);
    }

    // 4. Delete Profile
    public void deleteProfile(Long userId) {

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Profile not found"
                ));

        profileRepository.delete(profile);
    }

    // Convert Entity into Response DTO
    private ProfileResponseDto mapToResponse(Profile profile) {

        ProfileResponseDto response = new ProfileResponseDto();



        response.setFullName(profile.getFullName());
        response.setPhone(profile.getPhone());
        response.setLocation(profile.getLocation());
        response.setBio(profile.getBio());
        response.setSkills(profile.getSkills());
        response.setExperienceYears(profile.getExperienceYears());
        response.setResumeUrl(profile.getResumeUrl());


        return response;
    }
}
